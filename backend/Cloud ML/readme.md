> The cloud ML follows the following tree archtecture 
> >Setup.py 
>>trainer
>>>task.py
>>>__init__.py
>>>model.py

> The setup.py file basicly helps in installing the custom packages needed for creating the ML model.
> The task.py has four functions 
>> 1. download_files_from_gcs - Function to take the files and download it from google cloud storage.
>> 2. get_args - Function to take arguments from the user. The user arguments needed are the bucket directory, data-file-location etc
>> 3. load_data - this functions first downloads the data from gcs. All the preprocessing is done in this function. the function returns train-test data. 
>> 4. train_and_evaluate - The function defines all the estimator specs and exporter information and finally calls tf.estimator.train_and_evaluate function to start the training job.

