from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

API_URL = "https://api.coingecko.com/api/v3/coins/markets"

@app.route("/api/crypto")
def get_crypto():
    try:
        response = requests.get(API_URL, params={
            "vs_currency": "usd", #валюта, у нас доллары
            "order": "market_cap_desc",
            "per_page": 100, 
            "page": 1,
            "sparkline": False
        })
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True) 
