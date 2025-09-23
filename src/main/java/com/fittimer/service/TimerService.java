package com.fittimer.service;

import com.fittimer.model.TimerState;
import org.springframework.stereotype.Service;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class TimerService {
    private TimerState timerState;
    private ScheduledExecutorService scheduler;
    private Runnable countdownTask;

    public TimerService() {
        this.timerState = new TimerState();
        this.scheduler = Executors.newScheduledThreadPool(1);
    }

    public TimerState getTimerState() {
        return timerState;
    }

    public void startTimer(int seconds) {
        if (timerState.isRunning()) {
            stopTimer();
        }
        
        timerState.setRemainingSeconds(seconds);
        timerState.setRunning(true);
        timerState.setPaused(false);
        timerState.setStatus("RUNNING");

        countdownTask = () -> {
            if (timerState.getRemainingSeconds() > 0) {
                timerState.setRemainingSeconds(timerState.getRemainingSeconds() - 1);
            } else {
                timerState.setRunning(false);
                timerState.setPaused(false);
                timerState.setStatus("COMPLETED");
                scheduler.shutdown();
            }
        };

        scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(countdownTask, 0, 1, TimeUnit.SECONDS);
    }

    public void stopTimer() {
        if (scheduler != null && !scheduler.isShutdown()) {
            scheduler.shutdown();
        }
        timerState.setRunning(false);
        timerState.setPaused(false);
        timerState.setStatus("STOPPED");
    }

    public void resetTimer() {
        stopTimer();
        timerState.setRemainingSeconds(0);
        timerState.setStatus("STOPPED");
    }

    public void pauseTimer() {
        if (timerState.isRunning() && !timerState.isPaused()) {
            if (scheduler != null && !scheduler.isShutdown()) {
                scheduler.shutdown();
            }
            timerState.setPaused(true);
            timerState.setStatus("PAUSED");
        }
    }

    public void resumeTimer() {
        if (timerState.isPaused()) {
            timerState.setPaused(false);
            timerState.setRunning(true);
            timerState.setStatus("RUNNING");

            countdownTask = () -> {
                if (timerState.getRemainingSeconds() > 0) {
                    timerState.setRemainingSeconds(timerState.getRemainingSeconds() - 1);
                } else {
                    timerState.setRunning(false);
                    timerState.setPaused(false);
                    timerState.setStatus("COMPLETED");
                    scheduler.shutdown();
                }
            };

            scheduler = Executors.newScheduledThreadPool(1);
            scheduler.scheduleAtFixedRate(countdownTask, 0, 1, TimeUnit.SECONDS);
        }
    }
}
