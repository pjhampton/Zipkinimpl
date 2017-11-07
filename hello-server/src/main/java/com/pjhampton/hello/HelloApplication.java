package com.pjhampton.hello;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.sleuth.sampler.AlwaysSampler;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@SpringBootApplication
@RestController
@CrossOrigin
public class HelloApplication {

	private final static Logger logger = Logger.getLogger(HelloApplication.class.getName());

	@Autowired
	private RestTemplate restTemplate;

	Gson gson = new Gson();

	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}

	@Bean
	public AlwaysSampler alwaysSampler() {
		return new AlwaysSampler();
	}

	@CrossOrigin
	@RequestMapping("/")
	public String hello() {
		logger.info("Called hello (home)");
		Map<String, String> object = new HashMap<>();
		object.put("message", "hello world!");
		return gson.toJson(object);
	}

	@CrossOrigin
	@RequestMapping("/callhome")
	public String callhome() {
		logger.info("Calling home (callhome)");
		return restTemplate.getForObject("http://localhost:8080", String.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(HelloApplication.class, args);
	}

}
