package com.datmt.keycloak.springbootauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class  KeycloakSpringbootAuth {

	public static void main(String[] args) {
		SpringApplication.run(KeycloakSpringbootAuth.class, args);
	}
//	@Autowired
//	private EventRepository eventRepository;
//	@Autowired
//	private LocationRepository locationRepository;
//	@Override
//	public void run(String... args) throws Exception {
//
//		Event event = new Event();
//		Location location = new Location();
//		location.setId("aa");
//		location.setCity("Nabeul");
//		location.setName("Bni khalled");
//		location.setRegion("cap bon");
//		location.setZipCode("1131");
//		location.setLongitude("30.5");
//		location.setLatitude("22.8");
//		location.setCountry("tunisia");
//		locationRepository.save(location);
//		event.setId("1");
//		event.setCategory(null);
//		event.setDescription("foot ball competition");
//		event.setPicture("event.jpg");
//		event.setType("Sport");
//		event.setEventName("Maracana");
//		event.setLocation(location);
//		eventRepository.save(event);
//
//	}
}
