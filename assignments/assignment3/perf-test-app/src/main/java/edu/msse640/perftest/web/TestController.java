package edu.msse640.perftest.web;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping(value = "/health", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> health() {
        Map<String, Object> result = new HashMap<>();
        result.put("status", "UP");
        result.put("timestamp", Instant.now().toString());
        return result;
    }

    @GetMapping(value = "/delay", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> delay(@RequestParam(defaultValue = "100") long ms) throws InterruptedException {
        long safeDelay = Math.max(0, Math.min(ms, 10000));
        long start = System.currentTimeMillis();
        Thread.sleep(safeDelay);

        Map<String, Object> result = new HashMap<>();
        result.put("endpoint", "delay");
        result.put("requestedMs", ms);
        result.put("appliedMs", safeDelay);
        result.put("elapsedMs", System.currentTimeMillis() - start);
        return result;
    }

    @GetMapping(value = "/cpu", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> cpu(@RequestParam(defaultValue = "50000") int workUnits) {
        int safeUnits = Math.max(1000, Math.min(workUnits, 1_000_000));
        double sum = 0.0;

        for (int i = 1; i <= safeUnits; i++) {
            sum += Math.sqrt(i) * Math.sin(i);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("endpoint", "cpu");
        result.put("workUnits", safeUnits);
        result.put("checksum", sum);
        return result;
    }

    @GetMapping(value = "/payload", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> payload(@RequestParam(defaultValue = "200") int items) {
        int safeItems = Math.max(1, Math.min(items, 5000));
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < safeItems; i++) {
            sb.append("item-").append(i).append('|');
        }

        Map<String, Object> result = new HashMap<>();
        result.put("endpoint", "payload");
        result.put("items", safeItems);
        result.put("bytes", sb.length());
        result.put("data", sb.toString());
        return result;
    }
}
