from transformers import pipeline

# Load a QA pipeline with a pre-trained model
qa_pipeline = pipeline("question-answering", model="bert-large-uncased-whole-word-masking-finetuned-squad")

# Define context and question
context = "ChatGPT is an AI model developed by OpenAI, capable of understanding and generating human-like text."
question = "Who developed ChatGPT?"

# Get the answer
answer = qa_pipeline(question=question, context=context)

print(answer)