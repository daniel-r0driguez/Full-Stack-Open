```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/
    server activates
    server->>browser: HTML document
    server deactivates

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/kuva.png
    server activates
    server->>browser: PNG file
    server deactivates
```