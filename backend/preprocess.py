import pandas as pd
import json
import sys
from sklearn.preprocessing import RobustScaler

def preprocess_data(file_path):
    insurance_data = pd.read_excel(file_path)

    # Process the data as per your requirements
    columns = ['sex / gender', 'BMI', 'weight', 'height', 'blood pressure', 'cholesterol', 'smoker', 'blood sugar']
    data = insurance_data[columns].copy()

    # Convert categorical columns to numerical
    data['sex / gender'] = data['sex / gender'].apply(lambda x: 1 if x == 'Male' else 0)
    data['smoker'] = data['smoker'].apply(lambda x: 1 if x else 0)

    # Split blood pressure into systolic and diastolic
    data[['systolic', 'diastolic']] = data['blood pressure'].str.split('/', expand=True).astype(float)
    data.drop(columns=['blood pressure'], inplace=True)

    # Normalize numerical columns
    scaler = RobustScaler()
    numerical_columns = ['BMI', 'weight', 'height', 'cholesterol', 'blood sugar', 'systolic', 'diastolic']
    data[numerical_columns] = scaler.fit_transform(data[numerical_columns])

    # Convert timestamps to strings
    insurance_data = insurance_data.applymap(lambda x: x.strftime('%Y-%m-%d %H:%M:%S') if isinstance(x, pd.Timestamp) else x)
    
    # Handle NaTType and other non-serializable types
    insurance_data = insurance_data.where(pd.notnull(insurance_data), None)
    original_data = insurance_data.to_dict(orient='records')
    processed_data = data.to_dict(orient='records')

    with open('uploads/insurance_data_original.json', 'w') as f:
        json.dump({"columns": list(insurance_data.columns), "data": original_data}, f)

    with open('uploads/insurance_data_processed.json', 'w') as f:
        json.dump({"columns": list(data.columns), "data": processed_data}, f)

if __name__ == "__main__":
    file_path = sys.argv[1]
    preprocess_data(file_path)
    print("Original data saved to: uploads/insurance_data_original.json")
    print("Processed data saved to: uploads/insurance_data_processed.json")
