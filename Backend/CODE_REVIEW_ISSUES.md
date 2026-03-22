# Code Review Issues - GameLib Backend

## 1. Maven Configuration Issues (pom.xml)

### 1.1 Invalid Spring Boot Version
- **File:** `pom.xml:8`
- **Issue:** Spring Boot version `4.0.3` does not exist. The latest stable Spring Boot version is 3.x (e.g., 3.2.x or 3.3.x). This will cause Maven dependency resolution failures.
- **Impact:** Application cannot be built or run.

### 1.2 Duplicate Lombok Dependency
- **File:** `pom.xml:73-76` and `pom.xml:107-110`
- **Issue:** Lombok dependency is declared twice in the dependencies section. The first declaration includes version `1.18.30`, while the second has no version.
- **Impact:** Potential version conflicts and build warnings.

### 1.3 Java Version Inconsistency
- **File:** `pom.xml:30` and `pom.xml:151-152`
- **Issue:** The `java.version` property is set to `17`, but the maven-compiler-plugin configuration specifies `source` and `target` as `15`. Java 15 is not a supported LTS version.
- **Impact:** Inconsistent compilation behavior and potential runtime issues.

---

## 2. Security Vulnerabilities

### 2.1 Hardcoded Credentials in Application Properties
- **File:** `application.properties:3,7,8,12,19,20`
- **Issue:** Sensitive credentials are hardcoded in plain text:
  - MongoDB connection URI with username/password
  - Steam API keys (both official and unofficial)
  - JWT secret key
  - Google OAuth client ID and secret
- **Impact:** **CRITICAL SECURITY RISK** - All credentials are exposed in version control. Anyone with repository access can access the database and external services.

### 2.2 No Authentication Required
- **File:** `SecurityConfig.java:33`
- **Issue:** The security configuration permits all requests with `authorize.requestMatchers("/**").permitAll()`. The `.anyRequest().authenticated()` line is unreachable because `/**` matches all requests.
- **Impact:** All API endpoints are publicly accessible without authentication.

### 2.3 CORS Configuration Missing Protocol
- **File:** `SecurityConfig.java:44`
- **Issue:** CORS allowed origins are specified without protocol (e.g., `"localhost:8087"` instead of `"http://localhost:8087"`).
- **Impact:** CORS requests will fail because the browser requires full origin URLs including the protocol.

---

## 3. Naming Convention Violations

### 3.1 Service Class Names Not Following Java Conventions
- **Files:** `gameService.java`, `achievementService.java`
- **Issue:** Service class names start with lowercase letters. Java convention requires class names to start with uppercase (PascalCase). Should be `GameService` and `AchievementService`.
- **Impact:** Violates Java naming conventions and may cause confusion.

### 3.2 Consistent Spelling Error: "achivement" vs "achievement"
- **Files:** Multiple files throughout the codebase
- **Issue:** The word "achievement" is consistently misspelled as "achivement" in:
  - Package name: `dto.achivement`
  - Controller name: `AchivementController.java`
  - DTO class names: `CreateAchievementDTO.java`, etc.
  - URL path: `/achivement`
- **Impact:** API consumers may be confused by inconsistent naming.

### 3.3 Parameter Naming Issues
- **File:** `CommentController.java:38`
- **Issue:** Parameter name `numberOffCommnets` has typos (should be `numberOfComments`).
- **File:** `CommentController.java:30`
- **Issue:** Method documentation says "Returns List off Comments" (should be "of").
- **Impact:** Code readability and maintainability issues.

---

## 4. Business Logic Bugs

### 4.1 Game Update Creates New Entity Instead of Updating
- **File:** `gameService.java:43-51`
- **Issue:** The `updateGame()` method:
  1. Finds existing game by `steamAppId`
  2. Calls `updateEntityFromDto()` on the existing entity
  3. Creates a **new** entity using `gameMapper.toEntity(game)` (line 49)
  4. Saves the **new** entity instead of the updated existing one
- **Impact:** Updates will create duplicate records instead of modifying existing ones.

### 4.2 Wrong Exception Type in Comment Validation
- **File:** `CommentService.java:63,75`
- **Issue:** Methods `createCommentAchievement()` and `createCommentGame()` throw `KeyAlreadyExistsException` when the achievement/game **does not exist**. The exception name and logic are inverted - it should throw an exception when the entity doesn't exist (e.g., `NoSuchElementException`).
- **Impact:** Misleading error messages and incorrect error handling.

### 4.3 Missing createComment() Method
- **File:** `CommentService.java`
- **Issue:** The `CommentController.createComment()` method (line 98) calls `commentService.createComment(comment)`, but this method does not exist in `CommentService`. Only `createCommentAchievement()` and `createCommentGame()` exist.
- **Impact:** **Compilation error** - The application will not compile.

### 4.4 Redundant String Conversion
- **File:** `AchivementController.java:41`
- **Issue:** `String.valueOf(gameID)` is called on a parameter that is already a `String`.
- **Impact:** Unnecessary operation, no functional impact.

### 4.5 getCommentById Returns List Instead of Single Entity
- **File:** `CommentService.java:40-43`
- **Issue:** The method name `getCommentById` suggests returning a single comment, but it returns a `List<CommentDTO>` by querying `findByGameId()`.
- **Impact:** Method naming is misleading and logic may be incorrect.

---

## 5. API Design Issues

### 5.1 DELETE Endpoints Use @RequestBody
- **Files:** `CommentController.java:134`, `AchivementController.java:95`
- **Issue:** DELETE endpoints use `@RequestBody` to receive the ID. REST best practices recommend using `@PathVariable` for DELETE operations (e.g., `DELETE /comments/{id}`).
- **Impact:** Non-standard REST API design, potential client integration issues.

### 5.2 POST Endpoints Return 200 Instead of 201
- **Files:** All POST endpoints in controllers
- **Issue:** Create operations return `ResponseEntity.ok()` (HTTP 200) instead of `ResponseEntity.status(HttpStatus.CREATED).build()` (HTTP 201).
- **Impact:** Violates REST conventions. HTTP 201 should be returned for successful resource creation.

### 5.3 No Input Validation
- **Files:** All DTOs
- **Issue:** No validation annotations (e.g., `@NotNull`, `@NotBlank`, `@Valid`) on DTO fields. Controllers don't use `@Valid` annotation on request bodies.
- **Impact:** Invalid data can be submitted to the API without validation.

### 5.4 Generic Exception Handling
- **Files:** All controller methods
- **Issue:** All exceptions are caught with generic `catch (Exception e)` blocks, returning only HTTP 500. No specific exception handling for different error types (e.g., `NoSuchElementException` should return 404).
- **Impact:** Poor error reporting to API clients.

### 5.5 Inefficient Database Queries
- **Files:** `gameService.java:27`, `CommentService.java:34`, `achievementService.java:30`
- **Issue:** `getAllGames()`, `getAllComments()`, and `getAllAchievements()` load **all** records from the database, then apply `.limit()` in Java memory. This is extremely inefficient for large datasets.
- **Impact:** **Performance issue** - Database should handle limiting via query parameters.

---

## 6. Model and DTO Issues

### 6.1 JPA/MongoDB Annotations on DTOs
- **File:** `GameDTO.java:29-30,40,46,62,66,70,74,78`
- **Issue:** DTO classes use `@Id` and `@Field` annotations, which are meant for entity classes. DTOs should be plain Java objects without persistence annotations.
- **Impact:** Tight coupling between DTOs and persistence layer.

### 6.2 Inconsistent ID Types
- **Files:** Multiple model and DTO files
- **Issue:** ID types are inconsistent:
  - `Game.id`: `String`
  - `Comment.id`: `ObjectId`
  - `Achievement.id`: `ObjectId`
  - `Achievement.gameId`: `ObjectId`
  - `Comment.gameId`: `ObjectId`
  - `CreateAchievementDTO.gameId`: `Integer`
  - `UpdateAchievementDTO.gameId`: `Integer`
  - `UpdateCommentDTO.gameId`: `Integer`
- **Impact:** Type conversion errors and mapping failures.

### 6.3 Mixed Language in Field Names
- **Files:** `Comment.java:48`, `CommentDTO.java:50`, `CreateCommentDTO.java:44`
- **Issue:** Field name `bewertung` is German for "rating". Other fields are in English.
- **Impact:** Inconsistent naming, potential confusion for non-German speakers.

---

## 7. Mapper Issues

### 7.1 Missing ObjectId Mappers in GameMapper
- **File:** `GameMapper.java`
- **Issue:** `GameMapper` doesn't define custom mapping methods for `ObjectId` ↔ `String` conversions, but `CommentMapper` and `AchievementMapper` do. This may cause mapping failures when converting between entities and DTOs.
- **Impact:** Potential runtime mapping errors.

### 7.2 UpdateGameDTO gameId Type Mismatch
- **File:** `UpdateGameDTO.java:26`
- **Issue:** `steamAppId` field is `Integer` in `UpdateGameDTO`, but `String` in `GameDTO` and `Game` entity. MapStruct may fail to map between these types automatically.
- **Impact:** Potential mapping failures during updates.

---

## 8. Test Issues

### 8.1 Incomplete Test Method
- **File:** `GameTests.java:62-65`
- **Issue:** Second test method is empty and incomplete (just `@Test` annotation with no method body).
- **Impact:** Test compilation may fail.

### 8.2 Wrong ObjectMapper Import
- **File:** `GameTests.java:19`
- **Issue:** Uses `tools.jackson.databind.ObjectMapper` instead of `com.fasterxml.jackson.databind.ObjectMapper`.
- **Impact:** **Compilation error** - Wrong package for ObjectMapper.

### 8.3 Tests Require Live Database
- **File:** `GameTests.java:28-29`
- **Issue:** Tests use `@SpringBootTest` which loads the full application context and requires a running MongoDB instance. No mocking is used.
- **Impact:** Tests cannot run without external dependencies.

---

## 9. Missing Functionality

### 9.1 Empty Security Package
- **Directory:** `security/`
- **Issue:** The security package exists but is empty. JWT-related functionality (generation, validation, filters) is missing despite JWT dependencies in pom.xml and JWT configuration in application.properties.
- **Impact:** JWT authentication is configured but not implemented.

### 9.2 No Error Response Body
- **Files:** All controllers
- **Issue:** Error responses (`ResponseEntity.notFound()`, `ResponseEntity.internalServerError()`) return empty bodies. No error messages or details are provided to API consumers.
- **Impact:** Poor debugging experience for API clients.

### 9.3 Missing @Override Annotations
- **Files:** Various service and controller classes
- **Issue:** Methods implementing interface contracts or overriding methods lack `@Override` annotations.
- **Impact:** Reduced code clarity and maintainability.

---

## 10. Configuration Issues

### 10.1 Hardcoded API URLs
- **File:** `application.properties:9-10`
- **Issue:** Steam API URLs are hardcoded with specific parameters (e.g., `start=51&count=50`). These should be configurable or constructed dynamically.
- **Impact:** Inflexible configuration, difficult to modify without code changes.

### 10.2 Missing Required Properties
- **Issue:** The `config.redirect-uri` property is used in `SecurityConfig.java:21` but is only defined in `application.properties`. If the application runs with a different profile without this property, it will fail.
- **Impact:** Potential runtime failure with different Spring profiles.

---

## Summary

| Category | Count | Severity |
|----------|-------|----------|
| Security Vulnerabilities | 3 | Critical |
| Compilation Errors | 2 | High |
| Business Logic Bugs | 5 | High |
| API Design Issues | 5 | Medium |
| Naming Convention Violations | 3 | Low |
| Configuration Issues | 2 | Medium |
| Test Issues | 3 | Medium |
| Model/DTO Issues | 3 | Medium |
| Missing Functionality | 3 | Medium |
| **Total** | **29** | - |

### Critical Issues Requiring Immediate Attention:
1. **Hardcoded credentials** in version control
2. **Missing `createComment()` method** causing compilation failure
3. **Wrong `ObjectMapper` import** in tests causing compilation failure
4. **Game update creates duplicates** instead of updating existing records
5. **No authentication** on any endpoints
