# Offline Signer UI

[![View Live Demo](https://img.shields.io/badge/View_Live_Demo-grey?style=for-the-badge&logo=vercel)](https://offline-signing-ui.vercel.app/)

This repository contains the official web interface for the **Offline Signer** toolkit. It provides a secure, user-friendly workflow for the *online* steps of an air-gapped transaction: **Construction** and **Broadcasting**.

This UI works in tandem with the `offline-signer-cli`, which is a standalone executable that handles the high-security signing on an air-gapped machine.

## The Problem
1.  **Private Key Exposure:** Standard wallet workflows require your private key to be on an internet-connected device, increasing security risks for high-value operations.
2.  **Transaction Expiration:** Standard offline signing workflows are difficult on Solana due to the short lifespan (~1-2 minutes) of the `recentBlockhash`, making a manual air-gapped process unreliable.

## The Solution
This toolkit solves these problems by combining a simple web interface with a powerful, secure offline CLI.

1.  **Durable Nonces:** We eliminate the `recentBlockhash` problem by using a **Durable Nonce** account.
2.  **Hybrid Workflow:** This UI handles the *online* parts (construction, broadcasting). The separate `offline-signer-cli` handles the *offline* signing. Your private key never touches the browser or an internet-connected tool.



---

## How It Works: The Hybrid Workflow

This UI is designed to be the user-friendly "wrapper" for the online parts of the workflow.

### 1. Construct (Online UI)
Use the simple web form on this site (`/transfer-sol` or `/transfer-token`) to build your transaction. The app prepares all the data, and you just click a button to **download the `unsigned-tx.json` file.**

### 2. Sign (Offline CLI)
Move the downloaded file, your cold key (`.json`), and our `offline-signer-cli` tool to your **air-gapped machine**. In the terminal, run the simple `sign` command. This creates a `signature.json` file.

```bash
./offline-signer-cli sign
```
(You must [**download the CLI tool**](https://github.com/Kym0211/offline-signing-cli) for this step.)

### 3. Broadcast (Online UI)
Move the new `signature.json` file back to your online machine. Come back to this site, go to the **`/broadcast`** tab, and upload your files to securely send the transaction.

---

## ✨ Features

* **Modern UI:** Built with Next.js, Shadcn/ui, and Tailwind.
* **Animated:** Smooth, staggered animations on all pages using Framer Motion.
* **Transaction Construction:** Clean forms for building SOL and SPL Token transfers.
* **Secure Broadcasting:** A simple upload page to broadcast the signed transaction.
* **Clear Instructions:** A landing page that visually guides the user through the hybrid workflow.

## 🚀 Getting Started (For Developers)

To run this UI project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Kym0211/offline-signing-ui.git](https://github.com/Kym0211/offline-signing-ui.git)
    cd offline-signing-ui
    ```

2.  **Install dependencies (using `pnpm`):**
    ```bash
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the running application.

---
