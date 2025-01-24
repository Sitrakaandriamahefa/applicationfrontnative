# flask dependance pip install flask
from flask import Flask, request, jsonify
from connexion_collab import quora_scrap  # Importez votre code Colab

app = Flask(__name__)

@app.route('/run-colab', methods=['POST'])
def run_colab():
    try:
        # Exécute la fonction principale de votre code Colab
        output = main_function()
        
        # Renvoie la sortie du code sous forme de réponse JSON
        return jsonify({
            "success": True,
            "output": output
        })
    except Exception as e:
        # En cas d'erreur, renvoie un message d'erreur
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)