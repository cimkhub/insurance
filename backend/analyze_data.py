import sys
import json
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.decomposition import PCA

try:
    clusters = json.loads(sys.argv[1])
    data = json.loads(sys.argv[2])

    df = pd.DataFrame(data)

    cluster_results = []

    for cluster in clusters:
        characteristics = cluster['characteristics']
        # Example: handle numeric and categorical characteristics separately
        # You might want to add more complex logic based on your needs
        X = df[[char['name'] for char in characteristics]]

        # Convert categorical columns to numeric using one-hot encoding
        X = pd.get_dummies(X, drop_first=True)

        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        kmeans = KMeans(n_clusters=len(clusters), random_state=0)
        cluster_labels = kmeans.fit_predict(X_scaled)

        pca = PCA(n_components=2)
        X_pca = pca.fit_transform(X_scaled)

        cluster_results.append({
            'data': [{'x': x, 'y': y, 'cluster': int(cluster)} for x, y, cluster in zip(X_pca[:, 0], X_pca[:, 1], cluster_labels)]
        })

    result = {
        'datasets': [{
            'label': f'Cluster {i+1}',
            'data': cluster['data'],
            'backgroundColor': ['#FF6384', '#36A2EB', '#FFCE56'][i % 3]  # cycle through colors
        } for i, cluster in enumerate(cluster_results)]
    }

    print(json.dumps(result))

except Exception as e:
    error_message = json.dumps({"error": f"An error occurred: {e}"})
    print(error_message)
