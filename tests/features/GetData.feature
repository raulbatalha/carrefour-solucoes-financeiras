@get @getData
Feature: Get Data from endpoint /usuarios

  As a Automation Engennier,
  I want to validate the GET /usuarios endpoint

  Scenario: Successful GET request returns HTTP 200
    Given The GET API endpoint for users
    When I send GET request to /usuarios
    Then I receive response HTTP 200 OK

  Scenario: GET response matches JSON Schema
    Given The GET API endpoint for users
    When I send GET request to /usuarios
    Then I receive a valid response body for GET /usuarios
