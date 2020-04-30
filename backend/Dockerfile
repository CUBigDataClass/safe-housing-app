FROM python:3.8-slim
WORKDIR /backend/
COPY . /backend/
RUN pip3 install -r requirement.txt
EXPOSE 5000
ENTRYPOINT ["python3"]
CMD ["app.py"]