Feature: Gloud assignment project

  Background:
    Given I am accessing a CAS url with valid username and password

  @Gcloud
  Scenario: Gcloud 13 search
    And click on choose a commercial service link
    When I select the "Gcloud" project and "All: Find cloud hosting, software and support" as the agreement
    And name the project "Gcloud"
    And then I search for "vetting" and select the option "cloud-hosting"
    And click on update results button
    Then I should see the search results containing "vetting"
    And I click on the save search
    And give name to you search results and save
    And click on export results and confirm you cant edit
    And you should see the saved results in exported results tab
    And then download the saved results
   
  @GcloudDeleteSearch
  Scenario: Gcloud 13 search
    And click on choose a commercial service link
    When I select the "Gcloud" project and "All: Find cloud hosting, software and support" as the agreement
    And name the project "Gcloud"
    And then I search for "vetting" and select the option "cloud-hosting"
    And click on update results button
    Then I should see the search results containing "vetting"
    And I click on the save search
    And give name to you search results and save
    And click on export results and confirm you cant edit
    And you should see the saved results in exported results tab
    And delete the search results