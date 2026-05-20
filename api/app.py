import os
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from joblib import load

app = Flask(__name__)
CORS(app)

# ─────────────────────────────────────────────
# Carga del modelo
# ─────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_data = load(os.path.join(BASE_DIR, 'models', 'modelo_housing_final.pkl'))

model         = model_data['model']
FEATURES      = model_data['features']   # orden exacto que espera el modelo
PROVINCE_MAP  = model_data.get('province_map', {})

# ─────────────────────────────────────────────
# Features booleanas — se convierten a 0/1
# ─────────────────────────────────────────────
BOOL_FEATURES = [
    'ascensor', 'calefaccion', 'piscina',
    'aire_acondicionado', 'terraza', 'balcon', 'parking'
]

# ─────────────────────────────────────────────
# Endpoints
# ─────────────────────────────────────────────

@app.route('/')
def home():
    return jsonify({'message': 'API de prediccion de alquiler activa'})


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})


@app.route('/predict', methods=['POST'])
def predict():
    """
    Predice el precio de alquiler de una vivienda.

    Body esperado (JSON):
    {
        "surface": 80,
        "bedrooms": 3,
        "restrooms": 1,
        "location_name": "Bilbao",
        "ascensor": true,
        "calefaccion": true,
        "piscina": false,
        "aire_acondicionado": false,
        "terraza": true,
        "balcon": false,
        "parking": false
    }

    Respuesta:
    {
        "predicted_price": 950.75
    }
    """
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No se han recibido datos'}), 400

    # Validar campos obligatorios
    required = ['surface', 'bedrooms', 'restrooms', 'location_name']
    missing = [f for f in required if f not in data]
    if missing:
        return jsonify({'error': f'Faltan campos obligatorios: {missing}'}), 400

    try:
        # Resolver location_encoded desde el nombre de provincia
        location_name = data['location_name']
        location_encoded = PROVINCE_MAP.get(location_name)
        if location_encoded is None:
            return jsonify({'error': f"Provincia no reconocida: '{location_name}'. Consulta /provinces para ver las opciones validas."}), 400

        # Construir el diccionario de features
        row = {
            'surface':          int(data['surface']),
            'bedrooms':         int(data['bedrooms']),
            'restrooms':        int(data['restrooms']),
            'location_encoded': float(location_encoded),
        }

        # Convertir booleanos a 0/1
        for feat in BOOL_FEATURES:
            row[feat] = 1 if data.get(feat, False) else 0

        # DataFrame en el orden exacto que espera el modelo
        df_input = pd.DataFrame([row])[FEATURES]

        prediction = model.predict(df_input)
        price = round(float(prediction[0]), 2)

        return jsonify({'predicted_price': price})

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': f'Error interno: {str(e)}'}), 500


@app.route('/provinces', methods=['GET'])
def provinces():
    """
    Devuelve la lista de provincias validas para el formulario de full stack.
    """
    return jsonify({'provinces': sorted(PROVINCE_MAP.keys())})


# ─────────────────────────────────────────────
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
