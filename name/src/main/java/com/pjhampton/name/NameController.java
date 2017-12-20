package com.pjhampton.name;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
public class NameController {

    private String[] names = {
        "Sarah",
        "Winnie",
        "Peter"
    };

    @RequestMapping("/")
    public String getName() {
        int rand = new Random().nextInt(names.length);
        return names[rand];
    }
}
