package gibb.losve.gameLib.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI gameLibOpenAPI() {
        return new OpenAPI()
                .components(new Components())
                .info(new Info()
                        .title("GameLib API")
                        .description("""
                                    API for managing games, achievements, and comments.
                                    
                                    ## Overview
                                    This API allows clients to:
                                    - Manage games (create, read, update, delete)
                                    - Manage achievements for games
                                    - Manage comments for games
                                    
                                    ## Authentication
                                    Currently no authentication required.
                                    """)
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("GameLib Team")
                                .email("team@gamelib.local")));
    }
}
