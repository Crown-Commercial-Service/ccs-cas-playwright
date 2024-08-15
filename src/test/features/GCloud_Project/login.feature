Feature: Navigation to the CAS Url
    @login
    Scenario Outline: Navigation tests to new CAS url
        Given I am accessing a valid CAS url
        When the email "<email>" and password "<password>" is entered
        Then User should be validated "<assert>"
        Examples:
            | email                       | password   | assert          |
            | shruthi_cas_uat@yopmail.com | Test_12345 | valid           |
            | shruthi_cas_uat@yopmail.com |            | InvalidPassword |
            |                             | Test_12345 | InvalidEmail    |
            |                             |            | EmptyFields     |