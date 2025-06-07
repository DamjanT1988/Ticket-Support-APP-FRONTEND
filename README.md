# Support Tickets Frontend

Ett React-program för hantering av supportärenden, byggt för att integreras sömlöst med ett ASP .NET Core-backend. Innehåller funktioner för att skapa ärenden, filtrera efter status, sortera och visa/lägga till kommentarer.

## Innehåll
- [Demo](#demo)
- [Funktioner](#funktioner)
- [Förutsättningar](#förutsättningar)
- [Komma igång](#komma-igång)
- [Användning](#användning)
- [Projektstruktur](#projektstruktur)
- [Tillgängliga kommandon](#tillgängliga-kommandon)
- [Tekniker](#tekniker)
- [Tester](#tester)

## Demo
> _Lägg till en länk eller skärmdump här om tillgänglig._

## Funktioner
- **Skapa ärenden**: Skapa nya supportärenden med titel och beskrivning.
- **Filtrera efter status**: Visa ärenden som "Open", "In Progress" eller "Closed".
- **Sortera efter datum**: Växla mellan stigande och fallande sortering baserat på skapandedatum.
- **Kommentarer**: Expandera ärenden för att visa och lägga till kommentarer.
- **Responsivt gränssnitt**: Mobilvänlig design med Tailwind CSS.

## Förutsättningar
- [Node.js](https://nodejs.org/) (>=14.x)
- [npm](https://www.npmjs.com/) (>=6.x)
- ASP .NET Core-backend körs på `https://localhost:7207`

## Komma igång

1. **Klona repot**  
   ```bash
   git clone <repository-url>
   cd lagkassan-frontend
   ```

2. **Installera beroenden**  
   ```bash
   npm install
   ```

3. **Miljövariabler**  
   Skapa en `.env`-fil i projektets rot:
   ```
   REACT_APP_API_URL=https://localhost:7207/api
   ```

4. **Lita på utvecklingscertifikat**  
   På macOS/Linux:
   ```bash
   export NODE_TLS_REJECT_UNAUTHORIZED=0
   ```
   På Windows PowerShell:
   ```powershell
   $env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
   ```

5. **Starta appen**  
   ```bash
   npm start
   ```
   Appen öppnas på `https://localhost:3000`.

## Användning
- Använd formuläret högst upp för att skapa ett nytt ärende.
- Välj en status i dropdown-menyn för att filtrera ärenden.
- Klicka på sorteringsknappen för att ändra ordning på ärenden.
- Klicka på "Comments" på ett ärende för att visa och lägga till kommentarer.

## Projektstruktur
```
lagkassan-frontend/
├── src/
│   ├── api/
│   │   └── tickets.js       # Axios-klient
│   ├── components/
│   │   ├── TicketForm.jsx
│   │   ├── TicketItem.jsx
│   │   ├── TicketList.jsx
│   │   └── CommentThread.jsx
│   ├── hooks/
│   │   └── useTickets.js    # Anpassad hook för datahämtning
│   ├── pages/
│   │   └── Home.jsx
│   ├── App.jsx
│   └── index.js
├── public/
│   └── index.html
├── .env
├── package.json
└── README.md
```

## Tillgängliga kommandon
I projektmappen kan du köra:
- `npm start`: Startar appen i utvecklingsläge.
- `npm test`: Kör testsviten.
- `npm run build`: Bygger appen för produktion.

## Tekniker
- React
- Axios
- Tailwind CSS
- http-proxy-middleware
- ASP .NET Core (backend)

## Tester
Projektet innehåller en komplett testsvit med Jest och React Testing Library:
- **useTickets.test.js**: Verifierar att `useTickets`-hooken hämtar data initialt och vid filterändring.
- **TicketForm.test.jsx**: Säkerställer att formuläret validerar fält och anropar `onSubmit` med korrekt payload.
- **TicketItem.test.jsx**: Testar att statusändringar i enskilda ärenden skickas vidare via `onUpdate`.
- **TicketList.test.jsx**: Kontrollerar filtrering och att rätt filter-funktion kallas vid statusändring.
- **CommentThread.test.jsx**: Mockar API-anrop för att visa initiala kommentarer och lägga till nya.
- **App.test.js**: Verifierar att huvudkomponenten renderar titeln `Support Tickets`.

Alla tester ligger i `src/hooks` respektive `src/components` och körs med:
```bash
npm test
```
