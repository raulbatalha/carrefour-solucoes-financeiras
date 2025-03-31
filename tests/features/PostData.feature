@post @postData
Feature: Post Data to endpoint path /usuarios

  As a Automation Engineer,
  I want to make sure the API is working

  Background:
    Given A POST API endpoint

  Scenario: The API response should be HTTP 201 Created
    When I send POST request to /posts
    Then I get response HTTP 201 Created

  Scenario: The API response body matches the JSON Schema
    When I send POST request to /posts
    Then I get response body matches with the Schema for POST request

  Scenario Outline: The <key> value is accept <condition> String
    When I send POST request to /posts using request
      """
      <payload>
      """
    Then I get response body that has <key> value that is <condition> String

    Examples:
      | key   | condition | payload |
      | nome  | non-empty | {"nome":"Manaus","email":"manaus@mail.com","password":"123456","administrador":"true"} |
      | nome  | empty     | {"nome":"","email":"manaus@mail.com","password":"123456","administrador":"true"} |

  Scenario Outline: The API response body has a valid key value as inputed payload
    When I send POST request to /posts using request
      """
      <payload>
      """
    Then I get response body that has a valid key value as inputed payload

    Examples:
      | payload |
      | {"nome":"Manaus","email":"manaus@mail.com","password":"123456","administrador":"true"} |
      | {"nome":"Amazonas","email":"manaus@mail.com","password":"654321","administrador":"false"} |
