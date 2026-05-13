# Bitfinex Order Book (React Native)

This project implements a real-time Order Book similar to Bitfinex Trading UI.

## Features

- Real-time order book via WebSocket (Bitfinex API)
- Redux Toolkit + Redux Saga
- Auto-reconnection on network loss
- Aggregation level (precision) control
- View modes: Dual / Bids / Asks
- Depth visualization
- Performance optimized (throttled updates)

## 🛠 Tech Stack

- React Native (Expo)
- Redux Toolkit
- Redux Saga
- WebSocket (Bitfinex v2 API)

## Performance Considerations

- Throttled UI updates (150ms)
- FlatList optimization
- Memoized components
- Avoided unnecessary re-renders

## Run project

```bash
npm install
npx expo start
```
