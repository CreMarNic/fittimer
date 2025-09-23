package com.fittimer.model;

public class TimerState {
    private int remainingSeconds;
    private boolean isRunning;
    private boolean isPaused;
    private String status;

    public TimerState() {
        this.remainingSeconds = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.status = "STOPPED";
    }

    public TimerState(int remainingSeconds, boolean isRunning, boolean isPaused, String status) {
        this.remainingSeconds = remainingSeconds;
        this.isRunning = isRunning;
        this.isPaused = isPaused;
        this.status = status;
    }

    // Getters and Setters
    public int getRemainingSeconds() {
        return remainingSeconds;
    }

    public void setRemainingSeconds(int remainingSeconds) {
        this.remainingSeconds = remainingSeconds;
    }

    public boolean isRunning() {
        return isRunning;
    }

    public void setRunning(boolean running) {
        isRunning = running;
    }

    public boolean isPaused() {
        return isPaused;
    }

    public void setPaused(boolean paused) {
        isPaused = paused;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFormattedTime() {
        int minutes = remainingSeconds / 60;
        int seconds = remainingSeconds % 60;
        return String.format("%02d:%02d", minutes, seconds);
    }
}
