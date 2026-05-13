# Interview Prep Coach - App Specification

## Overview
Interview Prep Coach is a web app for preparing users for Full Stack Developer and Solutions Architect interviews.

The app provides:
- skill-based interview preparation,
- guided question-and-answer sessions,
- AI review of typed answers,
- mastery-based knowledge scoring,
- session tracking,
- long-term progress by skill category.

## Main goals
- Help users practice technical interviews in a structured way.
- Measure knowledge acquired in each skill over time.
- Track weak areas separately without using mistakes as direct rating penalties.
- Support both conceptual and scenario-based preparation.

## User tracks
The app has two main tracks:
1. Full Stack Developer
2. Solutions Architect

## Skill categories

### Full Stack Developer
- Java
- Spring Boot
- Node.js
- JavaScript
- TypeScript
- React
- Angular
- HTML/CSS
- REST APIs
- Databases
- PostgreSQL
- System Design
- Testing
- Docker
- Git
- Azure DevOps

### Solutions Architect
- System Design
- Cloud Fundamentals
- Azure
- Azure DevOps
- Security
- Scalability
- Reliability
- Performance Optimization
- API Design
- Integration Patterns
- Microservices
- Messaging
- Caching
- Disaster Recovery
- Cost Optimization
- Tradeoff Analysis
- Stakeholder Communication

## Core user flow
1. User opens the dashboard.
2. User sees tracks, categories, recent sessions, and current knowledge ratings.
3. User opens a category such as React, Java, Angular, or Azure DevOps.
4. The app starts a prep session.
5. The AI asks one interview question at a time.
6. The user types an answer.
7. The AI evaluates the answer and returns:
   - knowledge score out of 10,
   - star rating out of 5,
   - strengths,
   - missing concepts,
   - misconceptions if any,
   - improved answer,
   - extra explanation,
   - follow-up question.
8. The user continues through multiple questions.
9. The session is saved.
10. The category knowledge rating is updated using session performance over time.

## Rating model

### Core principle
Ratings must represent knowledge acquired in a specific skill.

Mistakes must not directly reduce the rating.

Mistakes should be tracked separately as:
- learning gaps,
- misconceptions,
- missing concepts,
- weak areas.

### Stored rating
- Rating is stored on a 10-point scale.
- Rating is displayed as 5 stars.
- Formula: stars = score / 2
- Example: 7/10 = 3.5 stars

### Mastery labels
- 0 to 2 = Beginner
- 3 to 4 = Developing
- 5 to 6 = Competent
- 7 to 8 = Proficient
- 9 to 10 = Mastery

### Answer evaluation rubric
Each answer should be evaluated using these dimensions:
- Concept understanding
- Completeness
- Practical application
- Depth
- Clarity

The AI should calculate a knowledge score from these dimensions.

### Important separation
The UI and backend logic must clearly separate:
- Knowledge Rating
- Improvement Areas

Do not use an error-based rating model.

## Session behavior
Each prep session should support:
- one question at a time,
- typed answers,
- per-question AI review,
- follow-up questions,
- multiple questions per session,
- end-of-session summary.

## Session data to store
For each session, store:
- user,
- track,
- category,
- date/time,
- questions asked,
- user answers,
- AI feedback,
- per-question knowledge score,
- per-question stars,
- strengths,
- learning gaps,
- improved answers,
- extra explanations,
- follow-up questions,
- session average knowledge score.

## Category rating logic
Each category should maintain an overall knowledge rating.

Requirements:
- based on multiple sessions,
- recent sessions weighted more than older ones,
- reflects current proficiency in the skill,
- not based on mistake count.

## AI interviewer behavior
The AI should act like an interview coach, not just a grader.

For every answer, it should:
- identify what the user got right,
- highlight missing concepts,
- correct misconceptions,
- provide an improved interview-quality answer,
- explain the topic more clearly,
- ask one relevant follow-up question,
- adapt difficulty based on recent performance.

## Question types

### Full Stack Developer
Include:
- conceptual questions,
- practical questions,
- debugging questions,
- design questions.

### Solutions Architect
Include:
- scenario-based questions,
- tradeoff-based questions,
- architecture design questions,
- cloud and integration questions,
- stakeholder communication questions.

## Difficulty levels
Support:
- Beginner
- Intermediate
- Advanced

## Required screens
- Dashboard
- Track view
- Category detail page
- Active prep session page
- Session summary page
- Progress analytics page
- History page

## UI requirements
- Clean modern responsive web app
- Dashboard cards for skill categories
- Numeric rating display out of 10
- Half-star rating display
- Progress charts
- Session history
- Feedback panel
- Follow-up question section
- Strengths section
- Improvement Areas section
- Dark mode support

## Suggested domain models

### User
- id
- name
- email

### Track
- id
- name

### Category
- id
- trackId
- name
- description
- difficulty

### Question
- id
- categoryId
- prompt
- level
- tags
- expectedTopics

### PrepSession
- id
- userId
- trackId
- categoryId
- startedAt
- endedAt
- overallKnowledgeScore
- overallStars

### SessionQuestion
- id
- sessionId
- questionId
- order
- userAnswer
- knowledgeScore
- stars
- strengths
- learningGaps
- misconceptions
- improvedAnswer
- extraExplanation
- followUpQuestion

### SkillRating
- id
- userId
- categoryId
- averageKnowledgeScore10
- averageStars5
- totalSessions
- trend
- masteryLabel

## Recommended technical direction
- Next.js + React + TypeScript
- Tailwind CSS
- Node.js backend
- PostgreSQL
- OpenAI-compatible API integration
- Recharts or Chart.js for analytics

## Future enhancements
- Behavioral interview mode
- Voice answers
- Resume-based question personalization
- Weekly study plans
- Retry weak topics mode
- Mock interview mode
- Company-specific question sets

## Non-functional requirements
- Maintainable codebase
- Reusable components
- Clear domain types
- Separation of UI and evaluation logic
- Easy to extend
- Mobile responsive
- Production-style structure

## Initial build order
1. Project setup and folder structure
2. Dashboard
3. Category detail page
4. Active prep session flow
5. Session summary
6. History page
7. Analytics page
8. Rating aggregation and trend logic