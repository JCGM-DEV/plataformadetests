/**
 * test_bank_ingles.js — Inglés Profesional
 * 4 Unidades — 42 preguntas por unidad (168 preguntas totales)
 * 2º DAW 2025-2026
 */
const TEST_BANK_INGLES = [
  {
    "concept_id": "ing_u1_q1",
    "unit": 1,
    "question": "What is the most formal salutation when writing to an unknown recipient?",
    "options": [
      "Dear Sir or Madam,",
      "Hey there,",
      "Hello team,",
      "Dear everybody,"
    ],
    "correct": 0,
    "explanation": "Use 'Dear Sir or Madam' or 'To whom it may concern' when addressing someone whose name or gender is unknown in formal correspondence.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q2",
    "unit": 1,
    "question": "Which phrase is standard to politely open a business email explaining its purpose?",
    "options": [
      "I am writing with reference to...",
      "Listen up about...",
      "I want to chat on...",
      "This email is about stuff like..."
    ],
    "correct": 0,
    "explanation": "'I am writing with reference to / regarding / to enquire about...' are formal and standard opening phrases in corporate communication.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q3",
    "unit": 1,
    "question": "Which closing formula is appropriate when addressing 'Dear Ms. Jenkins'?",
    "options": [
      "Yours sincerely,",
      "Yours faithfully,",
      "Cheers mate,",
      "Take care,"
    ],
    "correct": 0,
    "explanation": "In British business English, 'Yours sincerely' is used when addressing a named recipient ('Dear Ms. Jenkins'), whereas 'Yours faithfully' is used when the recipient is unnamed ('Dear Sir or Madam').",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q4",
    "unit": 1,
    "question": "What does the abbreviation 'CC' represent in email headers?",
    "options": [
      "Carbon Copy",
      "Central Communication",
      "Client Contact",
      "Certified Confidential"
    ],
    "correct": 0,
    "explanation": "'CC' stands for Carbon Copy. It sends a visible copy of the email to third parties who need to stay informed.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q5",
    "unit": 1,
    "question": "What does 'BCC' stand for, and what is its primary privacy advantage?",
    "options": [
      "Blind Carbon Copy; recipient email addresses are hidden from other recipients",
      "Business Carbon Copy; it delivers with higher priority",
      "Bulk Client Communication; it bypasses spam filters",
      "Binary Code Conversion; it encrypts attachments"
    ],
    "correct": 0,
    "explanation": "'BCC' (Blind Carbon Copy) conceals recipient addresses from each other, which is essential for GDPR compliance and bulk external mailings.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q6",
    "unit": 1,
    "question": "Which email subject line is the most effective and professional?",
    "options": [
      "URGENT READ NOW PLEASE!!!",
      "Issue #402: Production API Gateway 502 Timeout - Post-Mortem",
      "Quick question",
      "Hey from the dev team"
    ],
    "correct": 1,
    "explanation": "A professional subject line should be descriptive, concise, context-rich, and clearly indicate priority or reference ID without shouting in all caps.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q7",
    "unit": 1,
    "question": "Which phrase politely expresses an attachment in an email?",
    "options": [
      "Please find attached the latest system architecture diagram.",
      "Look at the thing I attached here.",
      "I stuck a file in this mail.",
      "Attached is what you wanted see ya."
    ],
    "correct": 0,
    "explanation": "'Please find attached...' or 'I have attached...' are polite, standard business conventions for referencing files.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q8",
    "unit": 1,
    "question": "How do you formally ask for a response by a specific deadline?",
    "options": [
      "I would appreciate it if you could reply by Friday, October 10th at 5:00 PM.",
      "Answer me ASAP or else.",
      "Get back to me soonish.",
      "Don't take forever to reply."
    ],
    "correct": 0,
    "explanation": "'I would appreciate it if you could reply by [Date]' balances courtesy with a clear time expectation.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q9",
    "unit": 1,
    "question": "Which word best describes a document that outlines candidate qualifications, work experience, and education in the UK/Europe?",
    "options": [
      "Curriculum Vitae (CV)",
      "Job Ledger",
      "Work Manifesto",
      "Personal Dossier"
    ],
    "correct": 0,
    "explanation": "In the UK and Europe, 'Curriculum Vitae' (CV) is standard. In the US, it is commonly called a 'resume' (résumé).",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q10",
    "unit": 1,
    "question": "In a cover letter for a Web Developer role, which statement best demonstrates proactive communication?",
    "options": [
      "I believe my expertise in React and REST APIs makes me a strong fit for your development team.",
      "I really need money and your office is close to my house.",
      "I know everything about computers so hire me.",
      "Your job looks easy enough for someone like me."
    ],
    "correct": 0,
    "explanation": "A strong cover letter highlights relevant technical competencies and clearly links them to the company's requirements.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q11",
    "unit": 1,
    "question": "What is the primary function of a 'Bug Report' written by a QA engineer?",
    "options": [
      "To document reproduction steps, expected behavior, actual behavior, and environment details",
      "To criticize the backend developer's code quality",
      "To request an immediate promotion",
      "To explain marketing strategies for a product"
    ],
    "correct": 0,
    "explanation": "A bug report must provide precise, actionable technical details: environment, steps to reproduce, expected vs actual result, and log snippets.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q12",
    "unit": 1,
    "question": "Which term refers to a brief, high-level summary placed at the start of a technical proposal?",
    "options": [
      "Executive Summary",
      "Footer Note",
      "P.S. (Post Scriptum)",
      "Disclaimer Appendix"
    ],
    "correct": 0,
    "explanation": "An Executive Summary synthesizes key business goals, technical architecture, timeline, and ROI for decision-makers and stakeholders.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q13",
    "unit": 1,
    "question": "What does 'ASAP' stand for in business messaging?",
    "options": [
      "As Soon As Possible",
      "Always Synchronize All Packets",
      "Automatic System Access Point",
      "After System Authentication Protocol"
    ],
    "correct": 0,
    "explanation": "'ASAP' stands for 'As Soon As Possible'. While common, in formal emails it can sometimes sound demanding; setting a specific deadline is often preferred.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q14",
    "unit": 1,
    "question": "What does 'FYI' mean when forwarding a technical email?",
    "options": [
      "For Your Information",
      "Fixed Yesterday Inside",
      "Formal Yearly Inspection",
      "Forwarded Yearly Indicator"
    ],
    "correct": 0,
    "explanation": "'FYI' means 'For Your Information', used when sharing context that requires awareness rather than immediate action.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q15",
    "unit": 1,
    "question": "Which phrase is most appropriate to apologize for an unexpected system downtime in a formal client advisory?",
    "options": [
      "We sincerely apologize for the inconvenience caused by the scheduled maintenance overrun.",
      "Our bad, the server exploded for a bit.",
      "Sorry folks, IT messed up again.",
      "Don't blame us, AWS had a hiccup."
    ],
    "correct": 0,
    "explanation": "Corporate incident communication requires empathetic, professional accountability without colloquialisms or finger-pointing.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q16",
    "unit": 1,
    "question": "What is an 'NDA' in software contract negotiations?",
    "options": [
      "Non-Disclosure Agreement",
      "Network Data Acquisition",
      "New Development Algorithm",
      "National Digital Archive"
    ],
    "correct": 0,
    "explanation": "An NDA (Non-Disclosure Agreement) is a legal contract that prohibits parties from sharing confidential information, source code, or trade secrets.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q17",
    "unit": 1,
    "question": "What does 'SLA' stand for in hosting and SaaS agreements?",
    "options": [
      "Service Level Agreement",
      "System Logic Architecture",
      "Server Load Allocation",
      "Secure Login Authorization"
    ],
    "correct": 0,
    "explanation": "An SLA (Service Level Agreement) formally specifies guaranteed uptime (e.g., 99.95%), support response times, and penalties for failure.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q18",
    "unit": 1,
    "question": "Which phrase would you use to decline a feature request politely in a GitHub issue response?",
    "options": [
      "Thank you for the proposal. However, this is outside the scope of our current roadmap.",
      "No way, that idea is completely useless.",
      "We will never build this, do not ask again.",
      "Go code it yourself if you want it."
    ],
    "correct": 0,
    "explanation": "Professional open-source etiquette requires respectful appreciation followed by clear justification based on project roadmap or scope.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q19",
    "unit": 1,
    "question": "What is the purpose of an 'RFC' (Request for Comments) in software engineering?",
    "options": [
      "To propose a technical specification or architecture change for peer discussion",
      "To complain about salary structures anonymously",
      "To send invoices to enterprise clients",
      "To test server response times automatically"
    ],
    "correct": 0,
    "explanation": "An RFC proposes architectural designs, protocol standards, or significant features to gather structured team feedback before implementation.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q20",
    "unit": 1,
    "question": "Which phrase is best to confirm receipt of an important technical document?",
    "options": [
      "I confirm receipt of the documentation and will review it by tomorrow noon.",
      "Got it.",
      "Document received, whatever.",
      "Seen."
    ],
    "correct": 0,
    "explanation": "Confirming receipt professionally reassures the sender and provides an estimated review timeline.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q21",
    "unit": 1,
    "question": "What does 'EOD' mean in team deadline commitments?",
    "options": [
      "End of Day (typically 5:00 PM or 6:00 PM)",
      "Emergency Operations Dispatch",
      "End of Database migration",
      "Estimated Operating Duration"
    ],
    "correct": 0,
    "explanation": "'EOD' (End of Day) means by the close of business hours on the current working day.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q22",
    "unit": 1,
    "question": "What does 'COB' mean when agreeing on deliverables?",
    "options": [
      "Close of Business",
      "Central Object Broker",
      "Certificate of Build",
      "Common Operational Branch"
    ],
    "correct": 0,
    "explanation": "'COB' (Close of Business) is synonymous with EOD, designating the official end of working hours (usually 5 PM in the relevant timezone).",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q23",
    "unit": 1,
    "question": "Which sentence uses correct professional business English for requesting a meeting reschedule?",
    "options": [
      "Would it be possible to reschedule our sprint review to Thursday at 10:00 AM due to a scheduling conflict?",
      "Move the meeting now, I have other things.",
      "I won't come today, pick another day.",
      "Cancel today's talk and do it Thursday instead."
    ],
    "correct": 0,
    "explanation": "Polite modal verbs ('Would it be possible to...', 'Could we...') convey professionalism when requesting adjustments.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q24",
    "unit": 1,
    "question": "What is a 'Statement of Work' (SOW) in client software projects?",
    "options": [
      "A formal contract document defining project deliverables, milestones, timeline, and pricing",
      "A daily developer timesheet",
      "A list of employee sick leaves",
      "A git commit message template"
    ],
    "correct": 0,
    "explanation": "An SOW (Statement of Work) details the exact scope, acceptance criteria, timeline, and cost of software deliverables for a client.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q25",
    "unit": 1,
    "question": "Which expression is used in a formal letter when following up on a pending invoice?",
    "options": [
      "We would like to remind you that invoice #849 was due on September 15th.",
      "Give us our money now.",
      "You forgot to pay us again.",
      "Pay invoice #849 immediately or we stop coding."
    ],
    "correct": 0,
    "explanation": "Polite reminder letters use neutral, factual phrasing ('We would like to remind you that...').",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q26",
    "unit": 1,
    "question": "In a Git Pull Request description, what is the best opening summary?",
    "options": [
      "This PR implements JWT authentication and closes issue #142 by adding token refresh middleware.",
      "Stuff works now, merge it.",
      "I changed a bunch of files, check them out.",
      "Backend improvements."
    ],
    "correct": 0,
    "explanation": "Clear PR descriptions specify the exact problem solved, linked issues, and architectural changes introduced.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q27",
    "unit": 1,
    "question": "What does 'README' signify in a software repository?",
    "options": [
      "A introductory markdown file explaining project setup, prerequisites, usage, and contribution guidelines",
      "A folder containing binary executable files",
      "A private log file readable only by system root",
      "A database dump format"
    ],
    "correct": 0,
    "explanation": "A README is the entry document for any codebase, guiding developers on installation, architecture, and running tests.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q28",
    "unit": 1,
    "question": "Which transition word best connects two contrasting technical points?",
    "options": [
      "However,",
      "Furthermore,",
      "Likewise,",
      "Consequently,"
    ],
    "correct": 0,
    "explanation": "'However' introduces contrast or opposing conditions. 'Furthermore' adds reinforcing points; 'Consequently' shows result.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q29",
    "unit": 1,
    "question": "Which phrase is used to state a causal result in technical writing?",
    "options": [
      "As a result of the unindexed query, the server CPU spiked to 100%.",
      "Despite the unindexed query, CPU spiked.",
      "Instead of unindexed queries, CPU was fine.",
      "In addition to unindexed query, no CPU used."
    ],
    "correct": 0,
    "explanation": "'As a result of...' clearly establishes cause-and-effect relationships in post-mortems and technical documentation.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q30",
    "unit": 1,
    "question": "What does 'WIP' indicate when prefixing a Pull Request title?",
    "options": [
      "Work In Progress (not yet ready for final code review or merge)",
      "Web Interface Protocol",
      "Wide Internet Provider",
      "Wireless Input Packet"
    ],
    "correct": 0,
    "explanation": "'WIP' warns maintainers and reviewers that the branch is still undergoing active modifications.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q31",
    "unit": 1,
    "question": "Which salutation is recommended when writing an email to a mixed gender group or entire dev team?",
    "options": [
      "Dear Team,",
      "Dear Sirs,",
      "Hey boys,",
      "Gentlemen,"
    ],
    "correct": 0,
    "explanation": "'Dear Team,' or 'Dear Colleagues,' is inclusive, professional, and avoids gender assumptions in modern international workplaces.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q32",
    "unit": 1,
    "question": "What is the formal counterpart to the informal word 'buy' in corporate procurement?",
    "options": [
      "Purchase",
      "Grab",
      "Acquire-stuff",
      "Pick up"
    ],
    "correct": 0,
    "explanation": "'Purchase' is the standard formal term for commercial buying in business documentation and invoices.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q33",
    "unit": 1,
    "question": "What is the formal counterpart to the phrasal verb 'find out'?",
    "options": [
      "Discover / Determine / Ascertain",
      "Figure on",
      "Look around",
      "Spot up"
    ],
    "correct": 0,
    "explanation": "In academic and technical writing, single Latinate verbs ('determine', 'ascertain', 'investigate') replace colloquial phrasal verbs.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q34",
    "unit": 1,
    "question": "How should you write an email sign-off when the tone is semi-formal and collegial?",
    "options": [
      "Best regards,",
      "XOXO,",
      "Peace out,",
      "Later,"
    ],
    "correct": 0,
    "explanation": "'Best regards' or 'Warm regards' strikes the ideal balance between professional respect and collaborative friendliness.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q35",
    "unit": 1,
    "question": "What is the purpose of an 'Out of Office' (OOO) auto-reply?",
    "options": [
      "To notify senders of your absence, return date, and alternative point of contact",
      "To automatically decline all incoming emails permanently",
      "To showcase vacation photos to company clients",
      "To forward all emails to your personal inbox"
    ],
    "correct": 0,
    "explanation": "An effective OOO auto-responder sets expectations by giving date ranges, emergency contacts, and response timelines.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q36",
    "unit": 1,
    "question": "In a technical CV, what is the best way to describe an achievement?",
    "options": [
      "Optimized database indexes, reducing query latency by 45% across 2M daily transactions",
      "I am very good at databases and worked on queries",
      "Made SQL faster because it was slow",
      "Helped the team with some backend tasks"
    ],
    "correct": 0,
    "explanation": "Strong resume bullet points use action verbs ('Optimized'), specific context ('database indexes'), and quantifiable metrics ('by 45%').",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q37",
    "unit": 1,
    "question": "Which word means 'to bring into conformity with a standard' in technical documentation?",
    "options": [
      "Standardize",
      "Standard-up",
      "Homogen-make",
      "Norming"
    ],
    "correct": 0,
    "explanation": "'Standardize' means to make consistent and compliant with established technical specifications or conventions.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q38",
    "unit": 1,
    "question": "What does 'TBD' stand for in project schedules and feature matrices?",
    "options": [
      "To Be Determined / Decided",
      "Target Build Directory",
      "Technical Binary Dump",
      "Total Business Data"
    ],
    "correct": 0,
    "explanation": "'TBD' indicates that a parameter, date, or decision is pending further analysis or stakeholder approval.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q39",
    "unit": 1,
    "question": "What does 'ETA' stand for in release management?",
    "options": [
      "Estimated Time of Arrival (or Completion)",
      "Emergency Technology Action",
      "Extended Testing Automation",
      "External Traffic Allowance"
    ],
    "correct": 0,
    "explanation": "'ETA' indicates the expected moment a task, patch, feature, or release will be delivered.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q40",
    "unit": 1,
    "question": "Which sentence conveys a polite, non-confrontational request for peer code review?",
    "options": [
      "Could you take a look at PR #88 when you have a moment? Any feedback is appreciated.",
      "Review my code right now, it's waiting.",
      "Why haven't you approved my PR yet?",
      "Merge my PR ASAP."
    ],
    "correct": 0,
    "explanation": "Collaborative engineering culture relies on courteous, considerate review requests that respect colleagues' focus time.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q41",
    "unit": 1,
    "question": "What is the role of a 'Post-Mortem' or 'Incident Report' document?",
    "options": [
      "To analyze root cause, impact, and preventive actions after an outage without blaming individuals",
      "To assign personal penalties to the engineer who caused an incident",
      "To list marketing achievements during the quarter",
      "To delete server logs after a security breach"
    ],
    "correct": 0,
    "explanation": "A 'blameless post-mortem' examines systems and processes to ensure future resilience rather than assigning individual fault.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u1_q42",
    "unit": 1,
    "question": "Which term describes short, daily, asynchronous written status updates in Slack or Teams?",
    "options": [
      "Async standup / Status check-in",
      "Oral defense",
      "Formal inquest",
      "Town hall lecture"
    ],
    "correct": 0,
    "explanation": "Asynchronous standups allow remote global teams to share 'What I did, What I will do, Blockers' across differing time zones.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q1",
    "unit": 2,
    "question": "What is the technical definition of 'Latency' in networking and cloud computing?",
    "options": [
      "The time delay between sending a data request and receiving the corresponding response",
      "The total storage capacity of a cloud volume",
      "The number of concurrent users on a web server",
      "The physical weight of network switches"
    ],
    "correct": 0,
    "explanation": "Latency measures delay (usually in milliseconds). High bandwidth with high latency can still feel sluggish (e.g. satellite links).",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q2",
    "unit": 2,
    "question": "What does 'Scalability' mean when evaluating web architecture?",
    "options": [
      "The ability of a system to handle increased workloads without sacrificing performance",
      "The ability to run exclusively on smartphone screens",
      "The legal compliance with European software patents",
      "The physical dimension of server rack mounts"
    ],
    "correct": 0,
    "explanation": "Scalability can be horizontal (adding more server nodes) or vertical (upgrading CPU/RAM of a single node).",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q3",
    "unit": 2,
    "question": "What is a 'Web Hook' (Webhook) in API integration?",
    "options": [
      "An automated HTTP POST callback triggered by an event in a source system",
      "A phishing technique used to steal session cookies",
      "A CSS framework for responsive layout grids",
      "A physical cable clamp inside server cabinets"
    ],
    "correct": 0,
    "explanation": "Webhooks enable event-driven architectures by pushing real-time payloads to destination URLs whenever specific events occur.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q4",
    "unit": 2,
    "question": "What does 'Idempotent' mean in HTTP method specifications?",
    "options": [
      "Making multiple identical requests has the same outcome as making a single request",
      "The request requires multi-factor authentication",
      "The endpoint executes only during nighttime server cron jobs",
      "The response body is encrypted with AES-256"
    ],
    "correct": 0,
    "explanation": "GET, PUT, and DELETE are idempotent HTTP methods; POST is not, because repeating POST usually creates multiple resource instances.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q5",
    "unit": 2,
    "question": "What is 'Refactoring' in software development?",
    "options": [
      "Restructuring existing code to improve internal structure and maintainability without altering its external behavior",
      "Rewriting code in a completely new programming language",
      "Fixing production critical bugs under emergency conditions",
      "Compressing images to reduce bundle size"
    ],
    "correct": 0,
    "explanation": "Refactoring cleans up code smells, reduces technical debt, and improves testability while preserving functional parity.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q6",
    "unit": 2,
    "question": "What does 'CI/CD' stand for in DevOps practices?",
    "options": [
      "Continuous Integration and Continuous Deployment (or Delivery)",
      "Computer Infrastructure and Cloud Development",
      "Centralized Interface and Code Debugging",
      "Cybersecurity Inspection and Code Defense"
    ],
    "correct": 0,
    "explanation": "CI automates building and testing code on every commit; CD automates staging or production releases upon successful pipeline checks.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q7",
    "unit": 2,
    "question": "What is a 'Race Condition' in concurrent programming?",
    "options": [
      "A bug where system behavior depends on the uncontrollable timing or sequence of concurrent execution threads",
      "A performance contest between two competitor web frameworks",
      "A network routing protocol selecting the fastest fiber path",
      "A fast compilation mode in modern TypeScript engines"
    ],
    "correct": 0,
    "explanation": "Race conditions occur when shared mutable state is accessed concurrently without proper synchronization or mutex locks.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q8",
    "unit": 2,
    "question": "What is 'Middleware' in backend web frameworks like Express or Django?",
    "options": [
      "Software functions that intercept and process HTTP requests and responses in a pipeline before reaching route handlers",
      "Hardware routers placed in the middle of a data center",
      "Database tables located between primary and foreign keys",
      "CSS styles applied midway through screen rendering"
    ],
    "correct": 0,
    "explanation": "Middleware handles authentication, logging, body parsing, CORS headers, and error catching in web server pipelines.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q9",
    "unit": 2,
    "question": "What does 'CORS' stand for in browser security?",
    "options": [
      "Cross-Origin Resource Sharing",
      "Centralized Online Routing Standard",
      "Cryptographic Object Relay System",
      "Client Operating Retrieval Scheme"
    ],
    "correct": 0,
    "explanation": "CORS is a browser security mechanism that uses HTTP headers to determine whether web pages can request resources from a different origin domain.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q10",
    "unit": 2,
    "question": "What is 'Garbage Collection' in runtime environments like V8 or the JVM?",
    "options": [
      "Automatic memory management that detects and deallocates memory occupied by objects no longer in use",
      "A physical recycling program for discarded server hard drives",
      "Deleting old git branches from remote repositories",
      "Purging temporary browser cookies upon logout"
    ],
    "correct": 0,
    "explanation": "Garbage collection reclaims heap memory automatically, avoiding manual allocation and deallocation memory leaks.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q11",
    "unit": 2,
    "question": "What does 'ORM' stand for in backend database management?",
    "options": [
      "Object-Relational Mapping",
      "Online Request Management",
      "Optical Resource Multiplexer",
      "Open Routing Matrix"
    ],
    "correct": 0,
    "explanation": "An ORM (e.g. Prisma, Hibernate, SQLAlchemy) maps database relational tables directly to object-oriented code classes.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q12",
    "unit": 2,
    "question": "What is a 'Deadlock' in database and operating system concurrency?",
    "options": [
      "A state where two or more processes are permanently blocked because each is holding a resource needed by the other",
      "A security lockdown triggered after three failed password attempts",
      "A physical failure of a hard disk read/write head",
      "A frozen web browser tab due to an infinite while loop"
    ],
    "correct": 0,
    "explanation": "Deadlocks happen when cyclic dependencies arise among mutually exclusive locked resources without preemption.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q13",
    "unit": 2,
    "question": "What is 'Payload' in the context of network communications and APIs?",
    "options": [
      "The essential transmitted data or body content of a message, excluding headers and metadata",
      "The cost charged by cloud providers for data transfer",
      "The physical weight of an enterprise server rack",
      "The time required to boot a virtual machine container"
    ],
    "correct": 0,
    "explanation": "In JSON HTTP calls, the 'payload' is the actual data object sent inside the request or response body.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q14",
    "unit": 2,
    "question": "What does 'Stateless' mean when describing REST architectural design?",
    "options": [
      "The server does not retain client session context between requests; each request contains all necessary data",
      "The application cannot store data permanently in any database",
      "The web page does not update its UI state after user interaction",
      "The server operates without any operating system installed"
    ],
    "correct": 0,
    "explanation": "In RESTful statelessness, every HTTP request must carry authentication tokens and parameters necessary for the server to process it.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q15",
    "unit": 2,
    "question": "What is 'Polymorphism' in Object-Oriented Programming (OOP)?",
    "options": [
      "The ability of different classes to respond to the same method call with class-specific implementations",
      "The practice of writing code in multiple programming languages simultaneously",
      "Converting an image between multiple graphic formats like PNG and WEBP",
      "The ability to run a server across multiple cloud availability zones"
    ],
    "correct": 0,
    "explanation": "Polymorphism allows objects of different subtypes to be treated through a common supertype interface while executing overridden behavior.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q16",
    "unit": 2,
    "question": "What does 'Dependency Injection' (DI) accomplish in modern software architecture?",
    "options": [
      "It supplies required objects or services to a client class from the outside rather than having the class instantiate them directly",
      "It automatically downloads npm packages whenever an error occurs at runtime",
      "It injects malicious SQL statements into backend database queries",
      "It compiles TypeScript files into native binary executables"
    ],
    "correct": 0,
    "explanation": "DI inverts control (IoC), decoupling components, improving testability, and allowing mock objects during automated unit testing.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q17",
    "unit": 2,
    "question": "What is 'Microservices Architecture'?",
    "options": [
      "An architectural style that structures an application as a collection of small, independently deployable and scalable services",
      "Writing web applications using tiny monitor resolutions",
      "Developing software exclusively on microcontrollers such as Raspberry Pi Pico",
      "A monolithic single-binary web application deployed on a mini server"
    ],
    "correct": 0,
    "explanation": "Microservices communicate via lightweight network protocols (HTTP/REST, gRPC) and enable independent scaling and tech stack choices.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q18",
    "unit": 2,
    "question": "What is 'Sharding' in database scaling strategies?",
    "options": [
      "Horizontally partitioning database data across multiple server instances to distribute load and storage",
      "Encrypting database tables with symmetric cryptographic keys",
      "Creating daily incremental backups on tape storage",
      "Normalizing relational tables to Third Normal Form (3NF)"
    ],
    "correct": 0,
    "explanation": "Database sharding divides rows of a table across multiple database nodes based on a partition key (shard key).",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q19",
    "unit": 2,
    "question": "What does 'Single Sign-On' (SSO) mean in authentication infrastructure?",
    "options": [
      "A user authenticates once and gains access to multiple distinct software systems without re-entering credentials",
      "A system where only one single user is allowed to log in at any given moment",
      "An authentication scheme relying strictly on biometric fingerprint scans",
      "A password policy requiring users to change passwords every 24 hours"
    ],
    "correct": 0,
    "explanation": "SSO protocols (OAuth 2.0, SAML, OpenID Connect) streamline authentication across enterprise application ecosystems.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q20",
    "unit": 2,
    "question": "What is a 'Daemon' in Unix-like operating systems?",
    "options": [
      "A background process that runs continuously without direct user interaction, providing system or network services",
      "A malicious software exploit designed to encrypt victim files",
      "A graphical user interface driver for 3D graphics cards",
      "A command-line text editor like Nano or Vim"
    ],
    "correct": 0,
    "explanation": "Daemons (e.g. systemd, httpd, sshd) run continuously in the background handling requests, timers, or hardware events.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q21",
    "unit": 2,
    "question": "What does 'Bandwidth' measure in network connectivity?",
    "options": [
      "The maximum theoretical rate of data transfer across a network path per unit of time",
      "The physical thickness of fiber optic transatlantic cables",
      "The electrical voltage required to power a Gigabit network switch",
      "The geographical distance between two networked edge nodes"
    ],
    "correct": 0,
    "explanation": "Bandwidth is quantified in bits per second (Kbps, Mbps, Gbps) and dictates network throughput capacity.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q22",
    "unit": 2,
    "question": "What does 'Throughput' signify in system performance benchmarks?",
    "options": [
      "The actual volume of work or data processed by a system in a given timeframe (e.g., requests per second)",
      "The latency of the fastest ping packet sent to a DNS resolver",
      "The amount of disk space occupied by server log archives",
      "The number of lines of code written by a developer each sprint"
    ],
    "correct": 0,
    "explanation": "While bandwidth is maximum theoretical capacity, throughput measures real-world processed transactions per second (TPS / RPS).",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q23",
    "unit": 2,
    "question": "What is 'Technical Debt' in agile software engineering?",
    "options": [
      "The implied cost of additional future rework caused by choosing an expedient, quick solution now instead of a better approach",
      "The financial debt accumulated by purchasing enterprise server hardware",
      "The cost of monthly software subscription licenses",
      "Unpaid overtime owed to software developers after a release"
    ],
    "correct": 0,
    "explanation": "Technical debt compounds like financial interest: unaddressed shortcuts lead to brittle codebases, regressions, and slower velocity.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q24",
    "unit": 2,
    "question": "What is a 'Memory Leak' in long-running backend processes?",
    "options": [
      "A failure to release discarded memory allocations, causing total consumption to grow until the system runs out of RAM",
      "A physical hole in a dynamic RAM circuit board",
      "Data leaking across public networks due to an unencrypted socket",
      "A CPU overheating issue caused by intensive mathematical operations"
    ],
    "correct": 0,
    "explanation": "Memory leaks degrade performance over time and eventually cause Out-Of-Memory (OOM) crashes if unmanaged.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q25",
    "unit": 2,
    "question": "What does 'Immutable' mean in data structures and state management (e.g. Redux)?",
    "options": [
      "An object whose state cannot be modified after it is created",
      "A variable whose value can be edited by any thread without locks",
      "A database table that deletes its records after 24 hours",
      "A server configuration that updates automatically every minute"
    ],
    "correct": 0,
    "explanation": "Immutable data structures prevent unintended side-effects and simplify tracking state mutations in modern frontends and functional code.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q26",
    "unit": 2,
    "question": "What is 'Serverless Computing' (e.g., AWS Lambda, Cloudflare Workers)?",
    "options": [
      "An execution model where the cloud provider dynamically manages server provisioning and charges only for compute execution time",
      "Running web applications entirely without any computer servers existing anywhere in the world",
      "Hosting a website on local desktop computers connected to peer-to-peer networks",
      "Writing code without using any backend programming languages"
    ],
    "correct": 0,
    "explanation": "In serverless, servers exist but are abstracted away; developers upload functions that trigger on-demand and scale to zero.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q27",
    "unit": 2,
    "question": "What does 'DOM' stand for in client-side web technology?",
    "options": [
      "Document Object Model",
      "Dynamic Operations Management",
      "Distributed Online Module",
      "Digital Optimization Method"
    ],
    "correct": 0,
    "explanation": "The DOM is an in-memory tree representation of the HTML document that JavaScript manipulates to alter content and styles dynamically.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q28",
    "unit": 2,
    "question": "What is 'Hydration' in Server-Side Rendering (SSR) frameworks like Next.js or Nuxt?",
    "options": [
      "The process where client-side JavaScript attaches event listeners to pre-rendered static HTML received from the server",
      "Refreshing server liquid cooling systems in data centers",
      "Downloading large binary assets over CDN connections",
      "Converting CSS color codes into RGBA values"
    ],
    "correct": 0,
    "explanation": "Hydration turns static HTML markup rendered by the server into fully interactive web pages by binding JS event handlers in the browser.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q29",
    "unit": 2,
    "question": "What is 'Tree Shaking' in modern JavaScript bundlers (Webpack, Vite, Rollup)?",
    "options": [
      "The automated removal of dead or unused exported code from the final production bundle",
      "Shaking physical hard drives to test hardware shock resistance",
      "Randomly reordering JavaScript files to prevent reverse engineering",
      "A CSS animation library that shakes UI elements when validation fails"
    ],
    "correct": 0,
    "explanation": "Tree shaking uses static ES module analysis (import/export) to eliminate unreachable code, drastically reducing asset payloads.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q30",
    "unit": 2,
    "question": "What does 'Zero-Day Vulnerability' mean in cybersecurity?",
    "options": [
      "A software vulnerability that is actively exploited or disclosed before the vendor has developed and released a patch",
      "A security flaw that takes zero days to fix completely",
      "A virus that only infects systems on the first day of each calendar month",
      "A bug discovered on day zero of an engineer joining a development team"
    ],
    "correct": 0,
    "explanation": "Zero-day implies zero days have passed since the vendor learned of the vulnerability, meaning no official fix exists yet.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q31",
    "unit": 2,
    "question": "What is 'Rate Limiting' in API security and architecture?",
    "options": [
      "Controlling the number of requests a client can submit to an API within a designated time window",
      "Limiting the download speed of video streaming users",
      "Restricting the price charged per API call by financial providers",
      "Throttling CPU clock frequency during high thermal events"
    ],
    "correct": 0,
    "explanation": "Rate limiting prevents abuse, brute-force credential stuffing, and Denial-of-Service (DoS) attacks by responding with HTTP 429 Too Many Requests.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q32",
    "unit": 2,
    "question": "What does 'SQL Injection' (SQLi) refer to?",
    "options": [
      "An attack where malicious SQL statements are inserted into entry fields to manipulate backend database execution",
      "A high-speed database driver used to improve query execution speed",
      "A technique for migrating relational databases into NoSQL datastores",
      "A database backup procedure executed via shell scripts"
    ],
    "correct": 0,
    "explanation": "SQLi allows attackers to bypass authentication, read private tables, or drop databases; parameterized queries prevent it.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q33",
    "unit": 2,
    "question": "What is 'Cross-Site Scripting' (XSS)?",
    "options": [
      "A vulnerability allowing attackers to inject malicious scripts into web pages viewed by other users",
      "A technique for sharing CSS stylesheets across different web domains",
      "A method for translating web pages into multiple human languages automatically",
      "A browser protocol for displaying 3D graphics using WebGL"
    ],
    "correct": 0,
    "explanation": "XSS can steal session tokens, hijack user accounts, or deface websites. Sanitization and Content Security Policy (CSP) mitigate it.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q34",
    "unit": 2,
    "question": "What does 'OAuth 2.0' primarily provide?",
    "options": [
      "A standardized authorization framework that enables third-party applications to obtain limited access to user resources",
      "A relational database schema for user profiles",
      "An encryption algorithm for local file storage",
      "A CSS preprocessor for design tokens"
    ],
    "correct": 0,
    "explanation": "OAuth 2.0 handles authorization (granting permissions via access tokens), while OpenID Connect handles authentication on top of it.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q35",
    "unit": 2,
    "question": "What is a 'Reverse Proxy' (e.g. Nginx, Traefik)?",
    "options": [
      "A server that sits in front of backend servers, forwarding client requests, balancing load, and handling SSL termination",
      "A client browser plugin that routes outgoing requests through Tor",
      "A database feature that reverses foreign key relationships",
      "A backup power supply in server facilities"
    ],
    "correct": 0,
    "explanation": "Reverse proxies enhance security, route traffic, provide caching, and terminate TLS certificates before passing traffic to internal microservices.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q36",
    "unit": 2,
    "question": "What is a 'Load Balancer'?",
    "options": [
      "A device or software that distributes network or application traffic across multiple backend servers",
      "A tool that balances electricity load between server power supplies",
      "A utility that balances the weight of hard drives in a NAS enclosure",
      "A software linter that ensures balanced curly braces in code"
    ],
    "correct": 0,
    "explanation": "Load balancers (layer 4 or layer 7) distribute load to maximize throughput, minimize response time, and eliminate single points of failure.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q37",
    "unit": 2,
    "question": "What is 'Failover' in high-availability systems?",
    "options": [
      "The automatic switching to a redundant or standby system upon the failure of the primary system",
      "The graceful notification displayed to users when a website crashes",
      "The process of rolling back a failed git commit automatically",
      "The logging of catastrophic application stack traces to disk"
    ],
    "correct": 0,
    "explanation": "Failover ensures continuity of operations: if primary node A fails health checks, traffic switches instantly to standby node B.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q38",
    "unit": 2,
    "question": "What does 'Containerization' (Docker) provide compared to traditional Virtual Machines?",
    "options": [
      "OS-level virtualization sharing the host OS kernel, resulting in lightweight, fast-starting isolated environments",
      "Emulation of entire hardware layers including independent operating system kernels",
      "A physical metal case designed to transport server motherboards securely",
      "A compression format for backing up database transaction logs"
    ],
    "correct": 0,
    "explanation": "Containers package software code, runtimes, and dependencies into isolated user spaces while sharing the host kernel.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q39",
    "unit": 2,
    "question": "What is 'Kubernetes' (K8s)?",
    "options": [
      "An open-source container orchestration platform for automating deployment, scaling, and management of containerized apps",
      "A relational database management system designed by Google",
      "A client-side JavaScript framework for building single-page applications",
      "A programming language used for embedded firmware"
    ],
    "correct": 0,
    "explanation": "Kubernetes manages container clusters across nodes, handling self-healing, rolling updates, service discovery, and auto-scaling.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q40",
    "unit": 2,
    "question": "What does 'DNS' stand for and what is its role?",
    "options": [
      "Domain Name System; it translates human-friendly domain names (e.g., example.com) into numerical IP addresses",
      "Digital Network Security; it encrypts fiber optic cables",
      "Dynamic Node Server; it compiles React templates",
      "Data Normalization Standard; it formats SQL databases"
    ],
    "correct": 0,
    "explanation": "DNS is the phonebook of the internet, resolving hostname strings into routable IPv4 and IPv6 addresses.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q41",
    "unit": 2,
    "question": "What is 'Edge Computing'?",
    "options": [
      "Processing data geographically closer to the end user device rather than relying exclusively on a centralized cloud data center",
      "Designing websites with curved border radiuses on all UI cards",
      "Computing calculations on the outer edge of server silicon wafers",
      "Executing JavaScript code only inside private incognito windows"
    ],
    "correct": 0,
    "explanation": "Edge computing reduces latency, saves bandwidth, and speeds up dynamic content delivery (e.g. Cloudflare Workers, AWS CloudFront Lambda@Edge).",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u2_q42",
    "unit": 2,
    "question": "What is a 'GraphQL' query language advantage over traditional REST?",
    "options": [
      "Clients can request exactly the data fields they need in a single round-trip, avoiding over-fetching and under-fetching",
      "GraphQL completely eliminates the need for any backend database servers",
      "GraphQL is faster because it does not use the underlying TCP/IP protocol",
      "GraphQL encrypts all database records with quantum cryptographic keys"
    ],
    "correct": 0,
    "explanation": "GraphQL allows client-defined queries against a typed schema, preventing the over-fetching typical of rigid REST endpoint responses.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q1",
    "unit": 3,
    "question": "What is the primary objective of a daily Scrum 'Standup' meeting?",
    "options": [
      "To quickly synchronize team progress by stating what was completed yesterday, what is planned today, and any blockers",
      "To hold a comprehensive code review session lasting several hours",
      "To negotiate individual salary increases with department heads",
      "To deliver a sales pitch to new prospective corporate clients"
    ],
    "correct": 0,
    "explanation": "Standup meetings are time-boxed (usually 15 minutes) and focus on daily synchronization, progress alignment, and identifying impediments.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q2",
    "unit": 3,
    "question": "Which phrase is the most natural way to open a technical presentation to an engineering team?",
    "options": [
      "Good morning everyone. Today I'd like to walk you through our new microservices architecture.",
      "Listen up guys, I am going to talk now.",
      "Hey you all, be quiet and look at my slides.",
      "I will start talking because it's on my calendar."
    ],
    "correct": 0,
    "explanation": "A professional presenter welcomes the audience, establishes rapport, and clearly states the presentation's core objective.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q3",
    "unit": 3,
    "question": "Which transition signal indicates you are concluding a section and moving to the next agenda item?",
    "options": [
      "Now that we have covered database migration, let's turn our attention to caching strategies.",
      "I am bored of this topic so next one.",
      "That was that, here comes other things.",
      "Forget what I just said, let's look at something else."
    ],
    "correct": 0,
    "explanation": "Explicit signposting ('Now that we have covered... let's turn our attention to...') provides narrative structure to technical talks.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q4",
    "unit": 3,
    "question": "How do you politely interrupt a colleague during a remote technical meeting to ask for clarification?",
    "options": [
      "Pardon me for jumping in, but could you clarify what you mean by 'event eventual consistency'?",
      "Shut up for a second, I don't understand.",
      "Stop talking, you are confusing everyone.",
      "Hey you, explain that word right now."
    ],
    "correct": 0,
    "explanation": "Diplomatic interruptions use polite softeners ('Pardon me for jumping in...', 'Sorry to interrupt, but...') to avoid sounding abrasive.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q5",
    "unit": 3,
    "question": "What should you say when an audience member asks a technical question you don't know the answer to?",
    "options": [
      "That is a great question. I don't have the exact metrics on hand, but I will investigate and follow up with you after the session.",
      "I don't know and it doesn't matter anyway.",
      "You shouldn't ask questions about things I didn't mention.",
      "Figure it out yourself in the documentation."
    ],
    "correct": 0,
    "explanation": "Professional speakers acknowledge the question honestly, offer to research the answer, and commit to following up.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q6",
    "unit": 3,
    "question": "Which phrase is ideal for expressing polite disagreement during an architecture review?",
    "options": [
      "I see your point, but have we considered the latency implications on mobile devices?",
      "Your idea is completely wrong and makes no sense.",
      "Nobody in their right mind would build it that way.",
      "I disagree completely because your proposal is terrible."
    ],
    "correct": 0,
    "explanation": "'I see your point, but...' validates the other person's perspective before constructively introducing counter-arguments or edge cases.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q7",
    "unit": 3,
    "question": "What is the function of an 'Icebreaker' at the start of an international workshop or seminar?",
    "options": [
      "A short, welcoming activity or question designed to make participants comfortable and encourage participation",
      "A technical stress test intended to crash the staging server",
      "A disciplinary warning about meeting attendance rules",
      "A hardware cooling device used for presentation projectors"
    ],
    "correct": 0,
    "explanation": "Icebreakers reduce social friction, especially in multicultural, multilingual distributed teams.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q8",
    "unit": 3,
    "question": "In an agile Sprint Retrospective, which three questions are traditionally discussed?",
    "options": [
      "What went well, what could be improved, and what actionable experiments will we try next sprint?",
      "Who broke production, whose fault was it, and how much bonus do they lose?",
      "Which client gave us the most money, how to fire staff, and where to host the party?",
      "Why is Java better than Python, how to avoid meetings, and what snacks to buy?"
    ],
    "correct": 0,
    "explanation": "Sprint retrospectives focus on continuous team self-improvement, psychological safety, and blameless iterative growth.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q9",
    "unit": 3,
    "question": "What does 'Pitching' mean in a tech startup or investor context?",
    "options": [
      "Delivering a compelling, concise presentation to persuade investors or stakeholders to back a product or idea",
      "Throwing old computer hardware into electronic waste containers",
      "Writing code without testing it first",
      "Assigning Jira tickets to junior developers"
    ],
    "correct": 0,
    "explanation": "A 'pitch' condenses problem, solution, market size, business model, and competitive advantage into a persuasive presentation.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q10",
    "unit": 3,
    "question": "What is an 'Elevator Pitch'?",
    "options": [
      "A succinct 30-to-60 second summary that explains what a product does and why it is valuable in the time of an elevator ride",
      "A technical specification for elevator control software",
      "A speech delivered exclusively in skyscraper buildings",
      "A slow, boring presentation that puts listeners to sleep"
    ],
    "correct": 0,
    "explanation": "An elevator pitch quickly sparks interest and conveys the core value proposition to busy executives or investors.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q11",
    "unit": 3,
    "question": "Which phrase is effective for checking if your audience can clearly see your shared screen in a virtual meeting?",
    "options": [
      "Can everyone see my shared screen clearly?",
      "Look at my screen right now!",
      "Is my screen showing up or are you blind?",
      "Tell me if you see anything."
    ],
    "correct": 0,
    "explanation": "'Can everyone see my screen?' is courteous, common etiquette before diving into demos or slides on Zoom/Teams/Meet.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q12",
    "unit": 3,
    "question": "How do you invite questions at the end of a technical presentation?",
    "options": [
      "Thank you for your time. I would be happy to answer any questions you may have.",
      "Done. Do not ask me anything hard.",
      "That's it. We can all leave now.",
      "Any questions? Hopefully none."
    ],
    "correct": 0,
    "explanation": "A gracious closing signals readiness to address questions and thanks listeners for their attention.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q13",
    "unit": 3,
    "question": "Which verbal strategy helps manage a meeting participant who is monopolizing the conversation?",
    "options": [
      "Thank you for your thoughts, Alex. Let's make sure we also hear perspectives from other team members.",
      "Alex, stop talking, nobody wants to listen to you anymore.",
      "Be quiet Alex, you talk too much.",
      "Mute Alex immediately."
    ],
    "correct": 0,
    "explanation": "A skilled facilitator acknowledges the contributor diplomatically while steering participation back to the broader group.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q14",
    "unit": 3,
    "question": "What is a 'Demo Day' or 'Sprint Demo'?",
    "options": [
      "A meeting where the development team showcases working software increments to product owners and stakeholders",
      "A day when all developers delete their temporary demonstration code",
      "A technical exam taken by interns before graduating",
      "A company holiday where no programming is allowed"
    ],
    "correct": 0,
    "explanation": "The sprint demo inspects working increments against the definition of done and gathers direct user feedback.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q15",
    "unit": 3,
    "question": "Which phrase is used to signal that you are wrapping up your presentation?",
    "options": [
      "In conclusion, adopting this CI/CD pipeline will cut our deployment cycle by half.",
      "Whatever, I am finishing now.",
      "I ran out of slides so bye.",
      "Finally, I can stop talking to you all."
    ],
    "correct": 0,
    "explanation": "'In conclusion...' or 'To sum up...' clearly marks the synthesis and closing takeaways of a formal presentation.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q16",
    "unit": 3,
    "question": "What does 'Active Listening' involve during technical requirement discussions?",
    "options": [
      "Fully focusing, understanding, responding, and summarizing what the speaker said to ensure mutual understanding",
      "Nodding silently while coding on another laptop window",
      "Constantly interrupting the client to finish their sentences",
      "Recording the audio without paying any attention to the conversation"
    ],
    "correct": 0,
    "explanation": "Active listening involves paraphrasing ('If I understood correctly, you need...'), asking open questions, and maintaining focus.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q17",
    "unit": 3,
    "question": "What is the best way to handle a microphone or audio issue during a remote presentation?",
    "options": [
      "Apologies, it seems my headset was muted. Can you hear me now loud and clear?",
      "Your computers must have broken speakers.",
      "Why isn't anyone responding to me?",
      "Fix your volume settings, everyone!"
    ],
    "correct": 0,
    "explanation": "Calm, polite troubleshooting quickly verifies hardware settings without frustration or blaming attendees.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q18",
    "unit": 3,
    "question": "What does 'Timeboxing' mean in meeting management?",
    "options": [
      "Allocating a fixed, pre-agreed maximum period of time for an activity or discussion topic",
      "Putting clocks inside cardboard storage boxes",
      "Arriving exactly twenty minutes late to every appointment",
      "Extending a meeting indefinitely until everyone is exhausted"
    ],
    "correct": 0,
    "explanation": "Timeboxing prevents discussions from dragging on endlessly, ensuring meetings finish on schedule with actionable outcomes.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q19",
    "unit": 3,
    "question": "Which phrase is appropriate when asking a remote participant who has background noise to mute?",
    "options": [
      "Could everyone not currently speaking please mute their microphones to reduce background noise?",
      "Turn off your noise, it is annoying!",
      "Who has the barking dog? Mute yourself now!",
      "Someone's audio is terrible, stop it."
    ],
    "correct": 0,
    "explanation": "Requesting universal muting politely resolves audio feedback without publicly singling out an embarrassed colleague.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q20",
    "unit": 3,
    "question": "What is an 'Action Item' recorded at the end of a meeting?",
    "options": [
      "A documented specific task assigned to an owner with an explicit completion deadline",
      "A dramatic action movie recommendation shared in team chat",
      "An emergency bug that forces the meeting to end abruptly",
      "A physical exercise break taken during long conferences"
    ],
    "correct": 0,
    "explanation": "Action items specify 'Who does What by When', guaranteeing accountability and follow-through after the meeting ends.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q21",
    "unit": 3,
    "question": "How do you describe a chart or graph during an architectural walkthrough?",
    "options": [
      "As you can see in this bar chart, API response times dropped substantially after caching was deployed.",
      "Look at the colorful drawing on this slide.",
      "This graphic has bars and numbers that look nice.",
      "This diagram explains everything without me needing to speak."
    ],
    "correct": 0,
    "explanation": "Guiding the audience through visual data ('As you can see...', 'This axis indicates...') clarifies data insights.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q22",
    "unit": 3,
    "question": "What does 'Off-topic' mean in an agenda discussion?",
    "options": [
      "A discussion point that is not relevant to the scheduled subject of the meeting",
      "A conversation that happens outside the physical office building",
      "A topic that is forbidden by government software regulations",
      "A question about technical hardware instead of software"
    ],
    "correct": 0,
    "explanation": "Discussions that drift off-topic should be parked into a 'Parking Lot' to keep meetings efficient and focused.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q23",
    "unit": 3,
    "question": "What is a 'Parking Lot' in agile meeting facilitation?",
    "options": [
      "A designated list where off-topic or unresolved questions are temporarily saved for discussion at a later time",
      "The physical area where developers park their vehicles",
      "A repository where abandoned software projects are stored",
      "A cloud server environment dedicated to hosting inactive containers"
    ],
    "correct": 0,
    "explanation": "Parking lots preserve valuable tangential ideas without letting them derail the immediate agenda.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q24",
    "unit": 3,
    "question": "In a job interview for a developer position, how should you answer 'What is your greatest technical weakness?'",
    "options": [
      "By mentioning a real growth area and explaining the concrete steps you are currently taking to improve it",
      "By saying 'I have no weaknesses, my code is always 100% bug-free'",
      "By replying 'I hate working with other people and I arrive late'",
      "By refusing to answer because weakness is private"
    ],
    "correct": 0,
    "explanation": "Self-awareness coupled with proactive remediation ('I am strengthening my knowledge of Kubernetes through hands-on labs') demonstrates maturity.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q25",
    "unit": 3,
    "question": "What does 'To touch base' mean in international business jargon?",
    "options": [
      "To briefly contact someone to exchange updates or ensure alignment",
      "To physically touch the base plate of a computer chassis",
      "To complete a marathon run with coworkers",
      "To initialize a base class constructor in C++"
    ],
    "correct": 0,
    "explanation": "'Let's touch base next Monday' is an everyday idiom meaning to check in briefly for a status update.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q26",
    "unit": 3,
    "question": "What does 'To take something offline' mean when said during a team meeting?",
    "options": [
      "To discuss a complex or specific topic separately after the meeting rather than holding up the entire group",
      "To disconnect the company internet connection intentionally",
      "To shut down the live production web servers",
      "To print out documents onto paper sheets"
    ],
    "correct": 0,
    "explanation": "'Let's take this offline' frees up the wider audience when two engineers need to debate an intricate technical detail.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q27",
    "unit": 3,
    "question": "Which question is best to verify agreement before moving to the next sprint goal?",
    "options": [
      "Are we all aligned on this deliverable, or does anyone have further concerns?",
      "Nobody cares, right? Next item.",
      "You all agree because I say so, agreed?",
      "Silence means you agree, moving on."
    ],
    "correct": 0,
    "explanation": "Confirming alignment ('Are we all aligned on this...?') builds shared ownership and prevents later misunderstandings.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q28",
    "unit": 3,
    "question": "What is the role of a 'Scrum Master' during team agile ceremonies?",
    "options": [
      "A servant-leader who facilitates ceremonies, removes team impediments, and promotes Scrum practices",
      "The supreme boss who dictates code syntax and writes annual reviews",
      "The lead programmer who writes all the production code alone",
      "A security guard who protects server infrastructure"
    ],
    "correct": 0,
    "explanation": "The Scrum Master coaches the team, facilitates retrospectives and daily standups, and shields the developers from external blockers.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q29",
    "unit": 3,
    "question": "What does 'To play devil's advocate' mean in a software design debate?",
    "options": [
      "To argue against an idea or proposal intentionally to test its strength and uncover hidden weaknesses",
      "To write malicious computer viruses for satanic organizations",
      "To insult coworkers during architectural meetings",
      "To support the worst possible code solution on purpose"
    ],
    "correct": 0,
    "explanation": "Playing devil's advocate is a healthy analytical tool that stress-tests architectural assumptions before commitment.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q30",
    "unit": 3,
    "question": "Which statement shows constructive feedback during a peer code review meeting?",
    "options": [
      "Extracting this logic into a helper function could make unit testing much easier. What do you think?",
      "Your code is unreadable spaghetti, rewrite everything.",
      "Did you even learn how to program before writing this?",
      "This function is hideous, delete it."
    ],
    "correct": 0,
    "explanation": "Constructive criticism offers specific rationale ('make unit testing easier') and invites collaborative discussion ('What do you think?').",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q31",
    "unit": 3,
    "question": "What is a 'Kick-off Meeting'?",
    "options": [
      "The initial meeting held with project stakeholders and the team to mark the official start of a project and align on objectives",
      "A meeting where underperforming team members are expelled from the company",
      "A soccer football match played by company staff on weekends",
      "A celebratory party held after a software project is completed"
    ],
    "correct": 0,
    "explanation": "Project kick-offs ensure everyone starts with clear visibility into the vision, scope, milestones, and governance.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q32",
    "unit": 3,
    "question": "How do you acknowledge and handle an angry client during a critical bug review call?",
    "options": [
      "Listen actively without interruption, acknowledge their frustration empathetically, and outline the immediate remediation plan",
      "Hang up the phone call immediately to avoid confrontation",
      "Blame the client for clicking the wrong buttons on the screen",
      "Tell the client to calm down and stop overreacting"
    ],
    "correct": 0,
    "explanation": "De-escalation begins with empathetic acknowledgment ('I completely understand how critical this downtime is for your business') and a concrete action plan.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q33",
    "unit": 3,
    "question": "What does 'Bandwidth' mean metaphorically when used by a colleague saying 'I don't have the bandwidth for this task'?",
    "options": [
      "They do not have the time, capacity, or mental availability to take on additional work right now",
      "Their home fiber internet connection is too slow to download files",
      "Their computer does not have enough RAM installed",
      "They are not legally authorized to access the company network"
    ],
    "correct": 0,
    "explanation": "In modern corporate language, personal 'bandwidth' refers to available time, energy, and work capacity.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q34",
    "unit": 3,
    "question": "Which phrase is best to summarize action points at the conclusion of a meeting?",
    "options": [
      "Let's quickly recap our action items: Sarah will draft the OpenAPI spec by Wednesday, and Carlos will configure the Docker environment.",
      "We did a lot of talking, hopefully someone remembers what to do.",
      "Meeting is over, go back to your desks.",
      "Someone do something about this project soon."
    ],
    "correct": 0,
    "explanation": "A precise recap of assigned owners, deliverables, and dates ensures execution momentum.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q35",
    "unit": 3,
    "question": "What does 'To think outside the box' mean when brainstorming a technical architecture problem?",
    "options": [
      "To approach a challenge with creative, unconventional, non-standard thinking",
      "To remove the computer casing and inspect the interior hardware",
      "To work in an open outdoor park instead of an office cubicle",
      "To throw away the packaging of newly delivered servers"
    ],
    "correct": 0,
    "explanation": "Thinking outside the box means questioning established assumptions to discover innovative solutions.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q36",
    "unit": 3,
    "question": "What is a 'Town Hall' meeting in a tech company?",
    "options": [
      "An all-hands company meeting where leadership shares company updates, strategy, and answers employee questions",
      "A municipal council gathering to vote on municipal tax rates",
      "A meeting held exclusively in historic municipal buildings",
      "A daily standup held by the junior engineering team"
    ],
    "correct": 0,
    "explanation": "Town halls promote transparency and company-wide alignment between executives and all employees.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q37",
    "unit": 3,
    "question": "Which phrase is polite to ask someone to speak more loudly or clearly during a call?",
    "options": [
      "I'm having a little trouble hearing you, could you speak up slightly or move closer to your microphone?",
      "Speak louder, I can't hear a word!",
      "Why are you whispering? Talk properly.",
      "Your mic is broken, shout instead."
    ],
    "correct": 0,
    "explanation": "A polite formulation ('I'm having trouble hearing you...') frames the issue constructively without hostility.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q38",
    "unit": 3,
    "question": "What does 'To be on the same page' mean?",
    "options": [
      "To have a shared understanding and agreement on a situation or plan",
      "To read the exact same printed sheet of paper together",
      "To browse the identical web address simultaneously",
      "To write identical code without any differences"
    ],
    "correct": 0,
    "explanation": "Being 'on the same page' means team members share the same vision, expectations, and goals.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q39",
    "unit": 3,
    "question": "What is an 'Unconference' or 'Open Space' session?",
    "options": [
      "A participant-driven meeting format where attendees create the agenda dynamically at the start of the event",
      "A conference where all windows and doors are kept wide open",
      "A meeting without any chairs or desks in the room",
      "An illegal gathering held without corporate authorization"
    ],
    "correct": 0,
    "explanation": "Unconferences emphasize peer-to-peer discussions, organic topics, and spontaneous knowledge sharing.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q40",
    "unit": 3,
    "question": "How do you smoothly hand over the presentation floor to a colleague?",
    "options": [
      "And with that, I'll pass the floor to Maria, who will walk us through the security audit findings.",
      "I'm done. Maria, talk.",
      "Next slide belongs to Maria, she can speak now.",
      "Maria take over, I am tired of talking."
    ],
    "correct": 0,
    "explanation": "Passing the floor cleanly ('I'll hand over to...', 'I'll pass the floor to...') maintains presentation professionalism.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q41",
    "unit": 3,
    "question": "What is the 'Rule of Three' in public speaking and presentation design?",
    "options": [
      "The concept that information presented in groups of three is naturally more engaging, memorable, and persuasive to audiences",
      "A strict rule stating that presentations must never exceed three minutes",
      "A requirement that every slide must have three distinct background colors",
      "A programming guideline requiring functions to take exactly three parameters"
    ],
    "correct": 0,
    "explanation": "From 'Beginning, Middle, End' to listing three key benefits, trios resonate powerfully in human communication.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u3_q42",
    "unit": 3,
    "question": "What does 'To wrap up' mean at the end of a sprint demo?",
    "options": [
      "To bring the session to a conclusion and summarize key outcomes",
      "To wrap physical computers with plastic bubble wrap",
      "To celebrate with gifts and festive wrapping paper",
      "To encrypt the video recording with AES before saving"
    ],
    "correct": 0,
    "explanation": "'Let's wrap up today's demo' is a widespread conversational idiom for ending a meeting efficiently.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q1",
    "unit": 4,
    "question": "What does the word 'Deprecated' mean in API or library documentation?",
    "options": [
      "A feature that is still supported for now, but is obsolete, discouraged, and scheduled for removal in future versions",
      "A feature that has been thoroughly optimized for high-performance computing",
      "A feature that requires an expensive enterprise subscription",
      "A feature that can only be accessed by root administrators"
    ],
    "correct": 0,
    "explanation": "Deprecated features warn developers to transition toward newer replacement methods before the deprecated code is permanently deleted.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q2",
    "unit": 4,
    "question": "In an API specification, what does an HTTP '401 Unauthorized' status code indicate?",
    "options": [
      "The client request lacks valid authentication credentials for the requested resource",
      "The server is temporarily down for hardware maintenance",
      "The requested URL resource does not exist on the server",
      "The request syntax is malformed or invalid JSON"
    ],
    "correct": 0,
    "explanation": "HTTP 401 signifies that authentication is required and has either failed or not yet been provided.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q3",
    "unit": 4,
    "question": "What is the critical distinction between HTTP '401 Unauthorized' and HTTP '403 Forbidden'?",
    "options": [
      "401 means the user is not authenticated (identity unknown), while 403 means the user is authenticated but lacks permission (authorization)",
      "401 is for mobile devices, while 403 is for desktop computers",
      "401 indicates database errors, while 403 indicates network cable faults",
      "There is no difference; they are completely interchangeable"
    ],
    "correct": 0,
    "explanation": "In standard HTTP semantics, 401 is 'Unauthenticated' (who are you?), while 403 is 'Forbidden' (we know who you are, but you cannot access this).",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q4",
    "unit": 4,
    "question": "What is the purpose of a 'Changelog' (CHANGELOG.md) in open-source projects?",
    "options": [
      "A chronologically ordered list of notable changes, new features, bug fixes, and breaking changes for each version release",
      "A log of developer working hours and overtime payments",
      "A list of customers who have purchased commercial licenses",
      "A backup archive of discarded git commits"
    ],
    "correct": 0,
    "explanation": "A well-maintained CHANGELOG helps developers understand upgrade impacts, migration steps, and new capabilities.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q5",
    "unit": 4,
    "question": "What does 'Semantic Versioning' (SemVer, e.g., 2.4.1) represent in its three numbers: MAJOR.MINOR.PATCH?",
    "options": [
      "MAJOR for incompatible breaking changes, MINOR for backwards-compatible features, PATCH for backwards-compatible bug fixes",
      "YEAR.MONTH.DAY of the software build",
      "CLIENTS.SERVERS.DATABASES connected to the cluster",
      "HOURS.MINUTES.SECONDS of compilation time"
    ],
    "correct": 0,
    "explanation": "SemVer (X.Y.Z) governs dependency compatibility: X breaks compatibility, Y adds features safely, Z fixes bugs safely.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q6",
    "unit": 4,
    "question": "What does 'Breaking Change' mean when upgrading a software library?",
    "options": [
      "A change in the library API that breaks backwards compatibility and requires developers to rewrite dependent code",
      "A bug that permanently damages server physical hardware",
      "A network disconnection that stops a software build in progress",
      "A feature that splits one team into two separate divisions"
    ],
    "correct": 0,
    "explanation": "Breaking changes require a major SemVer increment because existing client code will crash or fail to compile without manual modifications.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q7",
    "unit": 4,
    "question": "What is an 'SDK' (Software Development Kit)?",
    "options": [
      "A collection of software development tools, libraries, documentation, and code samples for building applications on a specific platform",
      "A special screwdriver kit used to assemble server racks",
      "A single-page website that lists company contact info",
      "A cybersecurity protocol for encrypting email attachments"
    ],
    "correct": 0,
    "explanation": "An SDK (e.g. AWS SDK, Android SDK) bundles client libraries, APIs, and tooling to simplify development on targeted platforms.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q8",
    "unit": 4,
    "question": "What does 'Boilerplate Code' mean in software development and documentation?",
    "options": [
      "Sections of standardized, repetitive code that must be included in many places with little or no alteration",
      "Code that overheats the computer CPU to dangerous temperatures",
      "Code written specifically to operate industrial heating boilers",
      "Encrypted source code that cannot be parsed by human eyes"
    ],
    "correct": 0,
    "explanation": "Boilerplates (e.g. HTML5 boilerplate, Express server setup) provide foundational starting templates for projects.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q9",
    "unit": 4,
    "question": "What is the primary role of 'OpenAPI' (formerly Swagger) specifications?",
    "options": [
      "A standardized, machine-readable interface description format for describing, documenting, and testing RESTful APIs",
      "A proprietary operating system developed by open-source consortia",
      "A database query language that competes with PostgreSQL",
      "A styling guideline for creating dark-mode dashboard interfaces"
    ],
    "correct": 0,
    "explanation": "OpenAPI defines endpoints, input schemas, HTTP status codes, and security mechanisms in JSON or YAML, generating interactive docs and client SDKs.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q10",
    "unit": 4,
    "question": "What does 'Prerequisites' mean in an installation or tutorial guide?",
    "options": [
      "Conditions, software dependencies, or background knowledge that must be satisfied before starting the guide",
      "Optional fun facts about the software author",
      "A list of past software bugs that were fixed in earlier releases",
      "The final steps taken to uninstall a software package"
    ],
    "correct": 0,
    "explanation": "'Prerequisites' (e.g., 'Node.js >= 18, Docker installed') guarantee that readers possess the necessary environment before attempting setup.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q11",
    "unit": 4,
    "question": "In technical documentation, what is a 'Snippet'?",
    "options": [
      "A small, reusable sample of source code illustrating how to use a specific function or feature",
      "A tiny hardware bug found in computer microprocessor chips",
      "A short audio clip recorded during a conference call",
      "A microsecond delay in network packet transmission"
    ],
    "correct": 0,
    "explanation": "Code snippets provide quick, contextual examples that developers can copy and adapt in their own projects.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q12",
    "unit": 4,
    "question": "What does the 'MIT License' grant to users of an open-source software project?",
    "options": [
      "Permissive rights to use, copy, modify, merge, publish, distribute, and sell copies, provided the copyright notice is included",
      "Permission to use the code only within university academic settings",
      "A strict requirement to make all derived private source code public under the GPL",
      "Exclusive authorization to run the code only on MIT university servers"
    ],
    "correct": 0,
    "explanation": "The MIT license is one of the most permissive open-source licenses, imposing minimal restrictions on commercial or private reuse.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q13",
    "unit": 4,
    "question": "What is the primary characteristic of the 'GNU General Public License' (GPL)?",
    "options": [
      "It is a 'copyleft' license: any derivative work must also be distributed under the same GPL terms with source code made available",
      "It allows commercial closed-source proprietary distribution without any attribution",
      "It forbids running the software on any computer connected to the public internet",
      "It requires users to pay royalties to the Free Software Foundation"
    ],
    "correct": 0,
    "explanation": "GPL's copyleft clause ensures freedom propagates to all derivative works, preventing proprietary enclosing of community code.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q14",
    "unit": 4,
    "question": "What does 'Sandbox' mean in developer documentation and testing?",
    "options": [
      "An isolated, safe testing environment where code can run or APIs can be tested without affecting production data",
      "A playground area in tech company offices with physical sand",
      "A storage location where deleted files are held before permanent destruction",
      "A browser feature that stores temporary user bookmarks"
    ],
    "correct": 0,
    "explanation": "API sandboxes (e.g. Stripe test mode, PayPal sandbox) emulate live systems using test credentials and dummy credit card numbers.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q15",
    "unit": 4,
    "question": "What is a 'Linter' in modern programming workflows?",
    "options": [
      "A static code analysis tool that flags syntax errors, anti-patterns, style violations, and potential bugs without executing the code",
      "A compiler that optimizes machine code into GPU assembly",
      "A program that formats hard drives with zero-fill algorithms",
      "A browser extension that blocks advertisements on web pages"
    ],
    "correct": 0,
    "explanation": "Linters (ESLint, Flake8) enforce code consistency and catch subtle errors early during local editing and CI builds.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q16",
    "unit": 4,
    "question": "In a software architecture document, what does 'Single Point of Failure' (SPOF) denote?",
    "options": [
      "A component whose individual failure will cause the entire system to stop functioning",
      "A developer who writes the most software bugs in a sprint",
      "A single syntax error that prevents a program from compiling",
      "A test case that consistently fails during regression testing"
    ],
    "correct": 0,
    "explanation": "High availability architecture aims to eliminate SPOFs through redundancy, multi-zone clustering, and automated failover.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q17",
    "unit": 4,
    "question": "What does 'Idempotency Key' mean in payment and transactional API documentation?",
    "options": [
      "A unique header token generated by the client to ensure an API request (e.g., payment charge) is processed exactly once even if retried",
      "The master cryptographic password of the database administrator",
      "The license key required to activate commercial enterprise software",
      "A hash representing the user's credit card expiration date"
    ],
    "correct": 0,
    "explanation": "Idempotency keys prevent duplicate credit card charges if network timeouts cause the client to retry an HTTP POST call.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q18",
    "unit": 4,
    "question": "What does 'Payload' refer to in HTTP POST / PUT request documentation?",
    "options": [
      "The actual data body sent inside the HTTP request (e.g. JSON object)",
      "The size in kilobytes of the HTTP header strings",
      "The internet service provider billing rate for data transfer",
      "The duration of the TCP three-way handshake"
    ],
    "correct": 0,
    "explanation": "Documentation outlines expected payload structures, mandatory fields, types, and schema validations.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q19",
    "unit": 4,
    "question": "What does 'Stack Trace' represent in runtime error documentation and logs?",
    "options": [
      "A report showing the active call stack frames and line numbers at the moment an exception or crash occurred",
      "A list of the physical server racks stacked in a data center room",
      "A diagram showing the marketing departments of a software company",
      "A history of all git commit messages pushed to the main branch"
    ],
    "correct": 0,
    "explanation": "A stack trace pinpoints the exact file and line number where an unhandled exception originated and how it propagated.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q20",
    "unit": 4,
    "question": "What is an 'Edge Case' in software requirements and testing?",
    "options": [
      "A rare, extreme, or boundary operating parameter that tests the limits of system behavior",
      "A feature that only operates on the edge of the computer screen",
      "A server installed at the physical boundary of a corporate campus",
      "A bug caused by clicking the corners of a touch screen"
    ],
    "correct": 0,
    "explanation": "Testing edge cases (e.g. empty arrays, leap year dates, maximum integer overflow) ensures robust, resilient software.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q21",
    "unit": 4,
    "question": "What does 'Graceful Degradation' mean in web and system resilience?",
    "options": [
      "The ability of a system to maintain partial limited functionality even when significant components or services fail",
      "A website that slows down deliberately when battery power is low",
      "The gradual discoloration of old computer monitors over time",
      "The automatic archiving of old customer records to cold storage"
    ],
    "correct": 0,
    "explanation": "Graceful degradation ensures users can still perform core tasks even if peripheral services (like recommendations or search) go offline.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q22",
    "unit": 4,
    "question": "What is 'Self-Documenting Code'?",
    "options": [
      "Code written with clear naming conventions and modular structure such that its intent is obvious without needing excessive comments",
      "Code that uses artificial intelligence to generate PDF documentation automatically",
      "A program that prints its own source code to the terminal console",
      "A website that updates its README every time a user logs in"
    ],
    "correct": 0,
    "explanation": "Clear variable and function names ('isUserAuthenticated()' vs 'chk()') make code readable and maintainable by design.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q23",
    "unit": 4,
    "question": "What does 'CRUD' stand for in database and API operations?",
    "options": [
      "Create, Read, Update, Delete",
      "Compile, Run, Upgrade, Debug",
      "Central Routing Universal Directory",
      "Certificate Revocation User Database"
    ],
    "correct": 0,
    "explanation": "CRUD represents the four fundamental operations performed on persistent datastores, aligning with POST, GET, PUT/PATCH, and DELETE.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q24",
    "unit": 4,
    "question": "What is an 'Exception' in programming languages?",
    "options": [
      "An anomalous event or error condition occurring during execution that disrupts the normal flow of program instructions",
      "A developer who is exempt from attending sprint standup meetings",
      "A line of code that compiles faster than all surrounding code",
      "A software license granted exclusively to non-profit entities"
    ],
    "correct": 0,
    "explanation": "Exceptions can be caught and handled with try/catch/finally blocks to prevent abrupt program termination.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q25",
    "unit": 4,
    "question": "What does 'Pagination' mean in REST API documentation?",
    "options": [
      "Dividing a large dataset into discrete, numbered pages or cursor-based chunks to optimize performance and bandwidth",
      "Printing API documentation onto physical paper pages",
      "Numbering lines of code inside an integrated development environment",
      "Converting HTML web pages into PDF format for printing"
    ],
    "correct": 0,
    "explanation": "Pagination (limit/offset or cursor-based) prevents queries from returning thousands of records in a single payload.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q26",
    "unit": 4,
    "question": "What is 'Cursor-Based Pagination' compared to 'Offset-Based Pagination'?",
    "options": [
      "Cursor pagination uses a unique pointer/timestamp to the last item fetched, remaining stable against insertions or deletions",
      "Cursor pagination requires the user to point a physical mouse cursor at the screen",
      "Cursor pagination only works in command line terminal windows",
      "Cursor pagination is slower and deprecated across all modern databases"
    ],
    "correct": 0,
    "explanation": "Cursor pagination handles real-time infinite scroll feeds accurately without skipping items or duplicating rows when new data arrives.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q27",
    "unit": 4,
    "question": "What does 'Query Parameter' mean in a URL like 'https://api.com/items?category=books&limit=10'?",
    "options": [
      "Key-value pairs appended after the '?' symbol used to filter, sort, or paginate requested resources",
      "The secret encryption password sent to access the database",
      "The domain name identifier registered with a DNS registrar",
      "The physical IP address of the server hosting the website"
    ],
    "correct": 0,
    "explanation": "Query strings allow clients to pass optional filters and sorting parameters in idempotent HTTP GET requests.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q28",
    "unit": 4,
    "question": "What does 'Path Parameter' mean in a REST URL like '/api/v1/users/{id}'?",
    "options": [
      "A variable part of the URL path that identifies a specific unique resource entity",
      "The physical file system directory where the server binary is installed",
      "The network routing hop count between client and server",
      "A setting configured inside the operating system PATH environment variable"
    ],
    "correct": 0,
    "explanation": "Path parameters (e.g. '/users/42') target a discrete individual resource identified by its unique key.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q29",
    "unit": 4,
    "question": "What does 'Bearer Token' mean in HTTP Authorization headers (e.g., 'Authorization: Bearer <token>')?",
    "options": [
      "A security credential that grants access to whoever bears (possesses) it, typically an encoded JWT access token",
      "A hardware USB security dongle shaped like a bear",
      "A token that can only be used during winter hibernation periods",
      "A certificate issued exclusively by heavy enterprise computing servers"
    ],
    "correct": 0,
    "explanation": "In OAuth 2.0, the holder of a valid Bearer token is presumed authorized without having to prove possession of a private key on each call.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q30",
    "unit": 4,
    "question": "What does 'JWT' stand for and what is its standard internal format?",
    "options": [
      "JSON Web Token; composed of three parts separated by dots: Header.Payload.Signature",
      "Java Web Transaction; an XML document encrypted with RSA-4096",
      "JavaScript Web Tool; a library for manipulating CSS styles",
      "Joint Wireless Transfer; a protocol for bluetooth communication"
    ],
    "correct": 0,
    "explanation": "A JWT (JSON Web Token) is a compact, URL-safe token whose signature verifies the integrity of the claims payload.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q31",
    "unit": 4,
    "question": "What is a 'Cold Start' in Serverless / Function-as-a-Service (FaaS) documentation?",
    "options": [
      "The delay that occurs when a serverless function is invoked after being idle, requiring the container environment to spin up",
      "Booting a computer in a cold server room during winter",
      "Recompiling an application from scratch without any cached build artifacts",
      "Starting a vehicle's battery using jumper cables"
    ],
    "correct": 0,
    "explanation": "Cold starts introduce latency spikes when provisioned runtimes must be initialized to serve sudden incoming requests.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q32",
    "unit": 4,
    "question": "What does 'Dead Code' mean in static analysis reports?",
    "options": [
      "Code that can never be executed because there is no control flow path reaching it from the rest of the program",
      "Code that has caused a fatal operating system kernel panic",
      "Code written by an engineer who has left the company",
      "Code stored on encrypted and decommissioned hard drives"
    ],
    "correct": 0,
    "explanation": "Dead code inflates bundle size, confuses maintainers, and should be safely pruned through tree shaking and refactoring.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q33",
    "unit": 4,
    "question": "What does 'Race Condition' documentation usually warn developers against?",
    "options": [
      "Unsynchronized concurrent access to shared mutable state that produces erratic, unpredictable outputs",
      "Running benchmark tests between two competing web browsers",
      "Typing code too quickly on a mechanical keyboard",
      "Deploying software updates faster than the documentation can be written"
    ],
    "correct": 0,
    "explanation": "Concurrency documentation highlights thread safety, atomic variables, transactions, and mutexes to avert race conditions.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q34",
    "unit": 4,
    "question": "What is 'Idempotency' in webhook delivery architecture?",
    "options": [
      "Designing consumers so that receiving the exact same webhook event multiple times produces the identical side effect only once",
      "Ensuring webhooks are sent exclusively via encrypted TLS channels",
      "Verifying that webhooks trigger instantly within 10 milliseconds",
      "Restricting webhook delivery to one single IP address globally"
    ],
    "correct": 0,
    "explanation": "Because network issues can cause webhook providers to retry delivery, consumers must check event IDs to avoid duplicate processing.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q35",
    "unit": 4,
    "question": "What does 'Hardcoded' mean when reviewing configuration settings in code?",
    "options": [
      "Embedding configuration values (like URLs or API keys) directly into source code instead of reading them from environment variables",
      "Writing code in assembly language to maximize hardware performance",
      "Protecting source code files with read-only file permissions",
      "Storing source code on physically hardened solid-state drives"
    ],
    "correct": 0,
    "explanation": "Hardcoded secrets and configuration violate 12-factor app principles and create severe security and environment portability risks.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q36",
    "unit": 4,
    "question": "What is an 'Environment Variable' (.env)?",
    "options": [
      "A dynamic key-value pair configured outside the application code to manage configuration per deployment environment",
      "A variable that measures the physical room temperature of a server room",
      "A global variable that can be accessed across different browser tabs",
      "A setting that controls computer monitor brightness levels"
    ],
    "correct": 0,
    "explanation": "Environment variables (e.g. DATABASE_URL, PORT) separate configuration from code, allowing clean transitions across dev, staging, and prod.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q37",
    "unit": 4,
    "question": "What does 'Cross-Platform' mean when reading software framework documentation?",
    "options": [
      "The capability of software to run seamlessly across multiple operating systems (e.g., Windows, macOS, Linux)",
      "Software designed exclusively for crossing road intersections safely",
      "A bridge connecting two separate local network routers",
      "Code that switches between light mode and dark mode automatically"
    ],
    "correct": 0,
    "explanation": "Cross-platform frameworks (e.g. Electron, Flutter, Node.js) minimize platform-specific rewrites by abstracting OS differences.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q38",
    "unit": 4,
    "question": "What does 'Rollback' signify in continuous deployment documentation?",
    "options": [
      "Reverting the application state or deployment to a previous known stable version after a defect is discovered in production",
      "Rolling backup tapes into fireproof storage safes",
      "Scrolling backward through server log files in a terminal",
      "Reverting database schema modifications manually one table at a time"
    ],
    "correct": 0,
    "explanation": "Automated zero-downtime rollbacks protect customer experience when health checks or smoke tests fail post-deployment.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q39",
    "unit": 4,
    "question": "What is 'Code Coverage' in automated testing documentation?",
    "options": [
      "A metric measuring the percentage of source code executed when an automated test suite runs",
      "A blanket placed over computer hardware to reduce fan noise",
      "The number of comments written per hundred lines of code",
      "The insurance policy covering commercial software bugs"
    ],
    "correct": 0,
    "explanation": "Code coverage reports (statements, branches, functions, lines) reveal untested execution paths in the codebase.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q40",
    "unit": 4,
    "question": "What does 'Smoke Test' mean in deployment verification?",
    "options": [
      "A preliminary minimal test suite executed to confirm that the basic and critical functions of a build work before running deeper tests",
      "Testing computer hardware components under extreme fire conditions",
      "Checking server ventilation pipes for accumulated dust and smoke",
      "An intense stress test that runs continuously for 48 hours"
    ],
    "correct": 0,
    "explanation": "Derived from plumbing and hardware tests, smoke tests ensure the build is basically intact before running full regression suites.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q41",
    "unit": 4,
    "question": "What does 'Regression' mean in software quality assurance?",
    "options": [
      "A software bug that causes a feature that was previously working to stop working after recent code changes",
      "The process of moving an office back to an older building",
      "Degrading user interface graphics to retro 8-bit styling",
      "Reverting a senior developer back to a junior job title"
    ],
    "correct": 0,
    "explanation": "Regression testing guards against unintended side-effects and breaks in existing functionality caused by new commits.",
    "noShuffle": false
  },
  {
    "concept_id": "ing_u4_q42",
    "unit": 4,
    "question": "What does 'Canonical' mean in URL structures and data schemas?",
    "options": [
      "The officially designated, authoritative, standard version of a URL or data representation to prevent ambiguity",
      "A web address that belongs to religious organizations",
      "A URL that only works when accessed through church wifi networks",
      "A temporary redirect that expires after 24 hours"
    ],
    "correct": 0,
    "explanation": "Canonical links (`<link rel='canonical'>`) tell search engines which URL represents the master copy, preventing duplicate content penalties.",
    "noShuffle": false
  }
];
