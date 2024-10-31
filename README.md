# Rubyok Chat

A beautiful dark-mode chatbot interface powered by Llama 2 running locally through Ollama.

![Rubyok Screenshot](https://images.unsplash.com/photo-1635002964051-738233b04c98?q=80&w=1280&fit=crop)

## Features

- 🌙 Dark mode interface
- 💎 Beautiful, minimal design
- 🚀 Real-time chat with Llama 2
- 🔒 Local AI - no data sent to external servers
- ⚡ Fast responses
- 📱 Responsive design

## Prerequisites

Before you begin, ensure you have the following installed on your Arch Linux system:

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Ollama

## Installation Steps

1. **Install Node.js and npm**
   ```bash
   sudo pacman -S nodejs npm
   ```

2. **Install Ollama**
   ```bash
   # Download the Ollama install script
   curl -L https://ollama.ai/install.sh | sh
   ```

3. **Start Ollama service**
   ```bash
   systemctl --user start ollama
   systemctl --user enable ollama  # Optional: enable at startup
   ```

4. **Pull the Llama 2 model**
   ```bash
   ollama pull llama2:3b
   ```

5. **Clone and set up Rubyok**
   ```bash
   # Clone the repository
   git clone [your-repo-url]
   cd rubyok

   # Install dependencies
   npm install

   # Start the development server
   npm run dev
   ```

## Usage

1. **Start the Ollama service** (if not already running)
   ```bash
   systemctl --user start ollama
   ```

2. **Start Rubyok**
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

4. Start chatting with Rubyok! The interface will automatically connect to your local Llama 2 instance.

## Troubleshooting

### Common Issues

1. **Ollama connection refused**
   - Ensure Ollama service is running:
     ```bash
     systemctl --user status ollama
     ```
   - Check if the model is downloaded:
     ```bash
     ollama list
     ```

2. **Slow responses**
   - The first response might be slow as the model loads into memory
   - Subsequent responses should be faster

### Model Management

- List installed models:
  ```bash
  ollama list
  ```

- Remove a model:
  ```bash
  ollama rm llama2:3b
  ```

## Development

- The frontend runs on Vite + React
- Tailwind CSS for styling
- TypeScript for type safety
- Lucide React for icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project however you'd like!