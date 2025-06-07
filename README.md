# Support Tickets Frontend

Ett React-program för hantering av supportärenden, byggt för att integreras sömlöst med ett ASP .NET Core-backend. Innehåller funktioner för att skapa ärenden, filtrera efter status, sortera och visa/lägga till kommentarer. Samt enhetstester.

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
- [Designbeslut](#designbeslut)
- [Teststrategi](teststrategi)

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
   cd ticketsupportapp
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
- JEST
- React Testing Library
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

## Designbeslut
- **Modulär komponentarkitektur**: Jag delade upp applikationen i små, återanvändbara funktionella komponenter (t.ex. `TicketList`, `TicketItem`, `TicketForm`, `CommentThread`). Detta gör det enklare att underhålla och testa isolerade delar av applikationen, men ökar antalet filer att navigera.
- **Custom Hooks för API-interaktion**: `useTickets`-hooken abstraherar all logik för att hämta, skapa och uppdatera tickets. Detta ger enkel återanvändning och centraliserad felhantering, men innebär en extra nivå av indirection som kan vara onödig i enklare appar.
- **State Management**: Jag undvek att introducera Redux eller andra externa state management-bibliotek för att hålla projektet lättviktigt. För större applikationer kan en global store vara att föredra för mer komplicerad delad state.
- **Fel- och laddningshantering**: I hooks används `isLoading` och `error`-state för att hantera API-anropens status. Detta kräver några extra rader kod men förbättrar användarens feedback vid långsamma eller felaktiga nätverksförfrågningar.
- **UI och stil**: Tailwind CSS valdes för snabb prototypning och enhetlig styling. Fördel: drar nytta av utility-classes för responsiv design. Nackdel: kan upplevas som mindre semantiskt än traditionell CSS och leder till långa klassnamn i JSX.
- **Avgränsad redigeringsfunktion**: Även om möjligheten att redigera titel och beskrivning finns i `TicketForm`, exponerades inte denna UI för att prioritera leverans av kärnfunktionalitet inom tidsramen. Vid fler itererade versioner skulle jag lägga till en separat vy eller modal för redigering.

## Teststrategi
- **Enhetstester med Jest**: Varje Hook och komponent har tillhörande tester (`*.test.jsx`) som verifierar rendering, state-hantering och callback-anrop. Detta ger snabbt feedback vid kodändringar, men kan öka byggtiderna i CI-miljö.
- **React Testing Library**: Används för att testa UI-komponenternas interaktioner på användarnivå (t.ex. att klicka på statusdropdown, skicka in formulär). Fokus på beteende framom implementation.
- **API Mocking**: Med `msw` (Mock Service Worker) simuleras nätverksanrop i testerna. Detta ger realistiska HTTP-scenarion utan att träffa riktiga API:er, men kräver konfiguration av mock-servrar.
- **Testtäckning**: Projektet inkluderar en `coverageThreshold` i `package.json` för att försäkra minst 80% täckning. Detta säkerställer att större delar av koden är testade, men kan leda till tester som fokuserar på kvantitet snarare än kvalitet.
- **Integrationstester**: Kommentarstråden har integrationstester som verifierar flödet av att hämta kommentarer och lägga till nya. Dessa tester är tyngre men säkerställer att flera delar av systemet fungerar tillsammans.
- **Kontinuerlig integration**: Tester är integrerade i GitHub Actions-workflowen, som körs vid varje PR. Säkerställer att inga regressionsfel introduceras, men kan öka feedback-loop-tiden vid större testsviter.
