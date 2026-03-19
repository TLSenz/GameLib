package gibb.losve.gameLib.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final OauthSuccessHandler successHandler;

    public SecurityConfig(OauthSuccessHandler successHandler) {
        this.successHandler = successHandler;
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity security, OauthSuccessHandler oauthSuccessHandler) {
        security
                .authorizeHttpRequests((authorize) ->
                        authorize
                                .anyRequest().authenticated()
                ).oauth2Login(oauth -> oauth.successHandler(successHandler));
        return security.build();
    }

}
