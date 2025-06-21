# Free AI Prompt Refiner

A fast, open-source prompt engineering assistant powered by Google Gemini and Retrieval-Augmented Generation (RAG).

## Features
- **Prompt Refinement:** Rewrite user input into clear, effective prompts using best-practice guidelines.
- **RAG Pipeline:** Retrieves relevant prompt-engineering techniques from a PDF knowledge base.
- **Fast Embedding & Retrieval:** Uses MiniLM embeddings for efficient chunk search.
- **API & CLI:** Run as a local API server or use the core library directly.
- **Easy PDF Updates:** Swap in your own PDF and re-chunk for custom RAG knowledge.

## Quick Start

### 1. Clone & Install
```sh
git clone https://github.com/yourusername/free-ai-prompt-refiner.git
cd free-ai-prompt-refiner
cd core
npm install
```

### 2. Configure Environment
Create a `.env` file in `core/` with your GCP Vertex AI details:
```
GCP_PROJECT_ID=your-gcp-project-id
GCP_LOCATION=us-central1
```

### 3. Prepare the Knowledge Base
Place your PDF (e.g., `PromptEngineering.pdf`) in `docs/`.

Chunk and embed it:
```sh
npx ts-node scripts/pdf-chunker.ts docs/PromptEngineering.pdf scripts/chunks.json
npx ts-node core/scripts/embed_chunks.js
```

### 4. Build & Run the API Server
```sh
cd core
npm run build
npm start
```
The API will be available at [http://localhost:3456](http://localhost:3456).

## API Usage

**POST /refine**
```json
{
  "text": "e-mail me about our new AI product launch"
}
```
**Response:**
```json
{
  "prompt": "Draft an email announcing our new AI product launch.",
  "suggestions": [
    "Using top-1 retrieval for faster response.",
    "Prompt refined based on most relevant guideline."
  ]
}
```

## Updating the PDF Knowledge Base
1. Replace `docs/PromptEngineering.pdf` with your new PDF.
2. Re-run the chunking and embedding scripts (see above).
3. Restart the server.

## Project Structure
```
free-ai-prompt-refiner/
  core/           # Main server, RAG, and API code
  scripts/        # PDF chunking and utilities
  docs/           # PDF knowledge base
  extension/      # (Optional) Browser extension
```

## Contributing
Pull requests and issues are welcome! Please open an issue to discuss major changes.

## License
MIT 