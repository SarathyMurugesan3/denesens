package com.denesens.interceptor;

import com.denesens.model.AdminMember;
import com.denesens.repository.AdminMemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Optional;

@Component
public class AdminAuthInterceptor implements HandlerInterceptor {

    @Value("${app.admin-secret}")
    private String adminSecret;

    private final AdminMemberRepository adminMemberRepository;

    public AdminAuthInterceptor(AdminMemberRepository adminMemberRepository) {
        this.adminMemberRepository = adminMemberRepository;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // OPTIONS requests should bypass auth headers
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        String requestSecret = request.getHeader("x-admin-secret");

        if (requestSecret == null || requestSecret.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"success\":false,\"error\":\"Unauthorized admin access. Missing authorization header.\"}");
            return false;
        }

        // 1. Check Master Owner Passcode
        if (requestSecret.equals(adminSecret)) {
            request.setAttribute("adminUserRole", "owner");
            request.setAttribute("adminUserName", "Master Owner");
            return true;
        }

        // 2. Check Admin Member Password in MongoDB
        try {
            Optional<AdminMember> memberOpt = adminMemberRepository.findByPassword(requestSecret);
            if (memberOpt.isPresent()) {
                AdminMember member = memberOpt.get();
                request.setAttribute("adminUserRole", member.getRole());
                request.setAttribute("adminUserName", member.getName());
                request.setAttribute("adminUserUsername", member.getUsername());
                return true;
            }
        } catch (Exception err) {
            System.err.println("[adminAuth] DB member check fallback: " + err.getMessage());
        }

        // 3. Fallback check (in-memory fallback can be checked or mocked if needed)
        // For Spring Boot, we will support standard dynamic registry, database is the primary source.

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write("{\"success\":false,\"error\":\"Unauthorized admin access. Invalid passcode or member credentials.\"}");
        return false;
    }
}
