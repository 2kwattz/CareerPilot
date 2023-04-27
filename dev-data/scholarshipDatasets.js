const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { Country } = require('country-state-city');

const scholarshipWebsites = [

    // Source 1
    {
        name: "National Scholarship Portal of India",
        url: "https://scholarships.gov.in/",
        selectors: {
            container: '.scholarship',
            name: '.scholarship-title',
            description: '.scholarship-summary',
            link: '.scholarship-cta a'
        }

    },

    // Source 2

    {
        name: "Scholarship For Me",
        url: 'https://scholarshipforme.com',
        selectors: {
            container: '.scholarship',
            name: '.scholarship-title',
            description: '.scholarship-summary',
            link: '.scholarship-cta a'
        }
    },

    //Source 3

    {
        name: "Buddy4Study Scholarships",
        url: 'https://www.buddy4study.com/scholarships',
        selectors: {
            container: '.scholarship',
            name: '.scholarship-title',
            description: '.scholarship-summary',
            link: '.scholarship-cta a'
        }
    },

    // Source 4

    {
        name: "Scholarships In India",
        url: 'https://www.scholarshipsinindia.com/',
        selectors: {
            container: '.scholarship',
            name: '.scholarship-title',
            description: '.scholarship-summary',
            link: '.scholarship-cta a'
        }
    },

    // Source 5

    {
        name: "Scholarships.Net ",
        url: 'https://www.scholarships.net.in/',
        selectors: {
            container: '.scholarship',
            name: '.scholarship-title',
            description: '.scholarship-summary',
            link: '.scholarship-cta a'
        }
    },

    // Source 6 

    {
        name: "ScholFin Scholarships",
        url: 'https://www.scholfin.com/',
        selectors: {
            container: '.scholarship',
            name: '.scholarship-title',
            description: '.scholarship-summary',
            link: '.scholarship-cta a'
        }
    },

    // Source 7

    {
        name: "StudyPortals Scholarships India",
        url: 'https://www.scholarshipportal.com/scholarships/india',
        selectors: {
            container: '.scholarship',
            name: '.scholarship-title',
            description: '.scholarship-summary',
            link: '.scholarship-cta a'
        }
    },


]



//  Avg Information Provided on these scholarship portals

// Title of the scholarship
// Last Updated Date
// Short description

//  Filter by

//  Indian schlarship portal statewise

// https://sarkariyojana.com/scholarships-for-indian-students/

//https://www.getmyuni.com/scholarships


