package com.fittimer.controller;

import com.fittimer.model.TimerState;
import com.fittimer.service.TimerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/timer")
@CrossOrigin(origins = "*")
public class TimerController {

    @Autowired
    private TimerService timerService;

    @GetMapping("/state")
    public ResponseEntity<TimerState> getTimerState() {
        return ResponseEntity.ok(timerService.getTimerState());
    }

    @PostMapping("/start")
    public ResponseEntity<TimerState> startTimer(@RequestParam(defaultValue = "60") int seconds) {
        timerService.startTimer(seconds);
        return ResponseEntity.ok(timerService.getTimerState());
    }

    @PostMapping("/stop")
    public ResponseEntity<TimerState> stopTimer() {
        timerService.stopTimer();
        return ResponseEntity.ok(timerService.getTimerState());
    }

    @PostMapping("/reset")
    public ResponseEntity<TimerState> resetTimer() {
        timerService.resetTimer();
        return ResponseEntity.ok(timerService.getTimerState());
    }

    @PostMapping("/pause")
    public ResponseEntity<TimerState> pauseTimer() {
        timerService.pauseTimer();
        return ResponseEntity.ok(timerService.getTimerState());
    }

    @PostMapping("/resume")
    public ResponseEntity<TimerState> resumeTimer() {
        timerService.resumeTimer();
        return ResponseEntity.ok(timerService.getTimerState());
    }
}
