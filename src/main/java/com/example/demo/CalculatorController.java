package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@Service
@RestController
@ControllerAdvice
@ApiOperation("Operations on two numbers")
@EnableGlobalMethodSecurity

public class CalculatorController {
    
    
    @GetMapping("/add")
    public int add(@RequestParam int num1, @RequestParam int num2) {
        System.out.println("Hellowworld!");
        return num1 + num2;
    }
    
    
    @PostMapping("/subtract")
    public int subtract(@RequestParam int num1, @RequestParam int num2) {
        return num1 - num2;
    }
    
    @PostMapping("/multiply")
    public int multiply(@RequestParam int num1, @RequestParam int num2) {
        return num1 * num2;
    }
    
    @PostMapping("/divide")
    public int divide(@RequestParam int num1, @RequestParam int num2) {
        if (num2 == 0) {
            throw new IllegalArgumentException("Cannot divide by zero!");
        }
        return num1 / num2;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST) 
    public String handleIllegalArgumentException(IllegalArgumentException ex) {
        return ex.getMessage();
    }
}
