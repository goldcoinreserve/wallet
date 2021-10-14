![](https://coincost.net/uploads/temp/4c6fb6e0682ec5477550c7914638169c.png)﻿
# GCR Wallet v1.0.7

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Cross-platform client to manage accounts, tokens, namespaces, and issue transactions.
***
## Features
### Home 
Sending transfers and invoices, dashboard displaying previous transactions, list of assets, available balance – all in one place.
### Accounts 
Add or remove accounts and contacts, preview information such as account details (public and private keys, Metadata), or back up your profile as a paper wallet.
### Tokens
View your owned and expired tokens or create new ones, with the options to set the supply, divisibility, duration and fee.
### Namespaces
View your owned and expired namespaces or create new namespaces and sub-namespaces.
### Multisig
Modify account multisig properties by defining an account as a Multi-Signature Account, adding cosignatories and defining the minimum number of signatures required to sign a transaction, add a cosigner or remove a cosigner.
### Staking
Use the Importance score of an account to create new blocks and receive rewards without having to run a node locally.
### Aggregate
Aggregate several simple, token or namespace transactions to conveniently merge them into a single transaction.
### News
Get the latest cryptocurrency news and articles, conveniently displayed in the News section.
***
## Installation

GCR Wallet is available for Mac, Windows, Linux, and as a web application.

1. Download GCR Desktop Wallet from the releases section.

2. Launch the executable file and follow the installation instructions.

3. Create a profile. Remember to save the mnemonic somewhere safe (offline).
***
## Building instructions (web version)

### Recomended

Ubuntu 18.04 TLS, 4Gb RAM

### Requirements

**Node.js 10 or 12 LTS** is required to run GCR Wallet as a web application.
It is recommended to install **npm**, the Node.js package manager. This can be done by executing the following command:

   ```
sudo apt install npm
   ```
   
1. Install nvm:

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

2. Logout and login to your server

```
exit
```

3. Update npm

```
nvm install 12 tls
```
   
4. Check version   
   
```
node -v
```

### Wallet Installation Instructions

1. Clone the project.

```
git clone https://github.com/goldcoinreserve/wallet.git
```

2. Navigate to the project folder.

```
cd wallet
```
	
3. Install the dependencies. This may take a while.

```
npm install 
```

4. Start the development server.

```
npm run dev 
```

5. Visit http://yourserverip:8080/#/ in your browser.

6. Build production package

```
npm run build 
```

7. Install apache

```
apt install apache2 
```

8. Move the compiled application to the webserver location

```
mv dist/* /var/www/html
```

***
## Feature status
### Features currently working

* Sending transactions                  ✔️
* Account and contact management        ✔️
* Exporting transactions                ✔️
* Multisig management                   ✔️
* Token creation                        ✔️
* Namespace creation                    ✔️
* News section                          ✔️
* Staking                               ✔️
* Profile Backup (PDF)                  ✔️
* Mnemonic Backup (PDF)                 ✔️
* QR Code Upload (Upload Image)         ✔️
* QR Code Import (Scan via Camera)      ✔️

***
## Main changes
* Changed news source (RSS channel) to cryptonews.com (https://cryptonews.com/news/feed) for more relevant news articles.
* Altered UI elements (colors, text, icons) for a more appealing, consistent and coherent appearance.
* Changed some terminology:
	* Mosaics       -> Tokens
	* Harvesting    -> Staking
* Gcr-paper-wallets node module has been added to enhance the design of exported PDF paper wallet (when making a backup of accounts or mnemonic phrases). The templates of paper wallets are .PDF files, encoded in Base64 and stored in encodedBasePdf.js and encodedBasePrivateKeyPdf.js files in /modules/gcr-paper-wallets/resources.
***
### Known issues

* The process of starting Delegated Staking may be problematic, as there may be difficulties in linking the node, remote and vrf keys. Linking a key may appear to be ineffective, as the screen may not refresh after signing the linking transaction. In that case, logout and login again.

***
### Additional notes

* The RSS feed (cryptonews.com) is fetched using a CORS proxy (cors-bridged) if the project is deployed in the 'development' environment, and without a proxy if the project is in the 'production' environment. For the web version of the project, the news section normally may not show any fetched news due to CORS policy, thus the CORS proxy is applied.

***
# Troubleshooting & FAQ (Frequently Asked Questions)
### Q: Nothing happens after I press "Link All keys" in the Staking menu and sign the transaction. What do I do?
 A: Try logging out of your account, and login again. Alternatively, link each key manually.

### Q: Nothing happens once I link a node, remote or vrf key in the Staking menu. What do I do?
 A: The linking may take up to 30 seconds, and the screen should refresh afterwards. If that doesn't happen, try logging out of the account and logging in again.

### Q: The Staking status is stuck on "ACTIVATION IN PROGRESS". What do I do?
 A: Check if you have more than 200 of network currency and staking currency, and if your Importance is higher than 0. Otherwise, stop the staking process, relink all the keys and try starting the staking process again. If all else fails, try a different node.

### Q: There's an issue that's not documented in this section. What do I do?
 A: If you encounter an issue, please click the "See an issue?" button in the bottom right corner and fill in the details of the issue report.
***