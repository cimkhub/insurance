import sys
import pandas as pd
import json

try:
    # Load data
    file_path = sys.argv[1]
    df = pd.read_excel(file_path)

    # Convert all datetime columns to strings
    for col in df.select_dtypes(include=[pd.Timestamp, 'datetime64[ns]']).columns:
        df[col] = df[col].astype(str)

    # Extract column names and data
    column_names = df.columns.tolist()
    data = df.to_dict(orient='records')

    result = {
        'columns': column_names,
        'data': data
    }

    # Print result as JSON string
    print(json.dumps(result))

except Exception as e:
    # Print the error as JSON
    error_message = json.dumps({"error": f"An error occurred: {e}"})
    print(error_message)
