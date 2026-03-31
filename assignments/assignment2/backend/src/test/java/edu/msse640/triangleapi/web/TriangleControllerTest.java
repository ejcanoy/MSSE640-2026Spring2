package edu.msse640.triangleapi.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TriangleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldClassifyScaleneTriangle() throws Exception {
        Map<String, Double> payload = Map.of("sideA", 3.0, "sideB", 4.0, "sideC", 5.0);

        mockMvc.perform(post("/api/triangles/classify")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.valid").value(true))
                .andExpect(jsonPath("$.triangleType").value("SCALENE"));
    }

    @Test
    void shouldReturnInvalidForTriangleInequalityFailure() throws Exception {
        Map<String, Double> payload = Map.of("sideA", 1.0, "sideB", 2.0, "sideC", 3.0);

        mockMvc.perform(post("/api/triangles/classify")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.valid").value(false))
                .andExpect(jsonPath("$.triangleType").value("INVALID"));
    }

    @Test
    void shouldReturnBadRequestForZeroLengthSide() throws Exception {
        Map<String, Double> payload = Map.of("sideA", 0.0, "sideB", 4.0, "sideC", 4.0);

        mockMvc.perform(post("/api/triangles/classify")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Validation failed"));
    }
}
