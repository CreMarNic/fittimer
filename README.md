# Fittimer - Fitness Timer App

A minimalist fitness timer app built with Spring Boot, featuring work/rest intervals, rounds, and cycles.

## Features

- ⏱️ **Work/Rest Timers**: Customizable work and rest intervals
- 🔄 **Rounds & Cycles**: Track multiple rounds and cycles
- 📱 **Mobile-Friendly**: Responsive design optimized for mobile devices
- 🎨 **Modern UI**: Dark theme with green/yellow color scheme
- 🔊 **Audio Notifications**: Sound alerts for phase transitions
- ⏸️ **Play/Pause Control**: Full timer control with pause/resume functionality

## Technology Stack

- **Backend**: Spring Boot 3.2.0
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Build Tool**: Maven
- **Java Version**: 17

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/fittimer.git
   cd fittimer
   ```

2. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

3. **Access the app**
   - Open your browser and go to `http://localhost:8080`
   - For mobile access, use your computer's IP address: `http://YOUR_IP:8080`

## Usage

1. **Set Work Timer**: Tap the work timer to set work duration
2. **Set Rest Timer**: Tap the rest timer to set rest duration
3. **Set Rounds**: Tap the rounds number to set total rounds
4. **Set Cycles**: Tap the cycles number to set total cycles
5. **Start Timer**: Press the play button to begin your workout
6. **Pause/Resume**: Use the play/pause button to control the timer

## How It Works

- **One Round** = Work timer + Rest timer (both complete)
- **One Cycle** = All rounds completed
- **Workout Complete** = All cycles completed

## Deployment

This app can be deployed to various platforms:

- **Heroku**: Use the included `Procfile`
- **Railway**: Connect your GitHub repository
- **Render**: Deploy directly from GitHub
- **Docker**: Use the included `Dockerfile`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created with ❤️ for fitness enthusiasts.