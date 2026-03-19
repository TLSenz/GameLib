package gibb.losve.gameLib.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${config.redirect-uri}")
    private String redirectUri;



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity security) {
        security
                .authorizeHttpRequests((authorize) ->
                        authorize
                                .requestMatchers("/swagger-ui").permitAll()
                                .anyRequest().authenticated()
                ).oauth2Login(oauth -> oauth.successHandler(((request, response, authentication) -> {
                    response.sendRedirect(redirectUri);
                })));
        return security.build();
    }

}
