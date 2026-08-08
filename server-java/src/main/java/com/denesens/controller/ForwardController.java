package com.denesens.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardController {
    
    // Catch-all mapping for non-file, non-API endpoints to forward to React index.html
    @RequestMapping(value = "{path:^(?!api|static|.*\\..*$).*}")
    public String redirect() {
        return "forward:/index.html";
    }
}
