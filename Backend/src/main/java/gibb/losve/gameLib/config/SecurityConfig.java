package gibb.losve.gameLib.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${config.redirect-uri}")
    private String redirectUri;



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity security) {
        security.cors(cors -> {
            cors.configurationSource(corsConfigurationSource());
                })
                .authorizeHttpRequests((authorize) ->
                        authorize
                                .requestMatchers("/swagger-ui").permitAll()
                                .anyRequest().authenticated()
                ).oauth2Login(oauth -> oauth.successHandler(((request, response, authentication) -> {
                    response.sendRedirect(redirectUri);
                })));
        return security.build();
    }

    @Bean
    UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:8087", "http://localhost:3000", "https://gamelib-frontend-production.up.railway.app"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT", "OPTIONS"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;

    }

}
