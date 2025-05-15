# Rock Shop Inventory App — UI/UX Planning and Reflection

## Purpose / Requirements / Audience

I will be working with a client for the 490 class. His problem has to do with creating an inventory system for his shop but also being able to add and sort through the list of inventory. The design needs to be intuitive because the client wants his not tech-savvy employees to be able to use it with minimal training, as well as new employees that will eventually be hired.

The users are a small number of employees. While my client is very tech-savvy, he cannot guarantee the same for the other users. I plan for about 3–6 consistent users.

An interesting challenge is the device being used will be a computer. While many people are used to using phones, this could be a challenge for some who rarely use a computer.

I feel the users would like to have a seamless experience; everything should function simply and smoothly. New and current users should feel comfortable using the software and get the rocks sold or looked up very quickly. The users do not want to feel like they are forcing customers to wait longer than necessary to buy a product.

For the design, I would like to make the app feel more like a phone experience. While still being on a computer, it will feel comfortable and non-threatening to new users who have more experience with smaller portable devices.



One thing I noticed during my initial test was that the user was trying to use my paper mock up as a touch screen. So I decided to do my tests with a keyboard and mouse as the software would be used on a computer not a touch screen. See screenshots.

---

## Tests / User Stories

### Test 1
- **Approach**: I gave the individual the mockup drawing and told him to treat it like it is a real app and I would explain or show what will happen when actions are taken.
- **Observations**: The test subject appeared to freeze up whenever switching between pages.
- **Feedback**: Felt things were too cluttered, with too much information close together. Proposed additional functionality (edit, delete) and ways to reduce information display.

**Reflect**:
> I feel that maybe having all the important add and inventory on the initial page with the ability to hide information that's not needed would help. Switching between pages seemed less intuitive. Spacing is important so users aren’t overwhelmed with cluttered information.

---

### Test 2
- **User Profile**: Not computer-savvy. Mostly uses a smartphone.
- **Observations**: Took a long time to make the connection between the paper mockup and a real app. Felt the information displayed was clunky and responded slowly.

**Reflect**:
> I think I want to incorporate a way to combine information so it’s obvious it belongs together and not just a long list. Users seemed to get lost in large lists, which could affect search result clarity.

---

### Test 3
- **Tool Used**: Flutter app
- **Observations**: User could make sense of the app more easily. Was asked to search and find specific gems and could report back information without much instruction.

**Reflect**:
> The only issue was using a phone emulator on a computer. Slightly unintuitive but not a major issue. The test went very smoothly. User appreciated the idea of hiding information until it was needed and found the search function easy to use.

---

### Test 4
- **Tool Used**: Full web interface
- **Observations**: User felt confident and found the app familiar and intuitive. Felt less overwhelmed than users in earlier tests. Frustrated there was no delete function after making a mistake.

**Reflect**:
> I need to add an easy way to fix mistakes so users don’t feel overwhelmed. Adding edit and delete functions will help users feel more in control.

---

## Design

Based on the tests, I decided to change several aspects of the UI:

- **Less Information at Once**: Early mockups displayed too much all at once. Users felt overwhelmed. I transitioned to a minimalist design with simple colors.
- **Single Page Layout**: Users struggled when switching between an "add" page and an "inventory" page. I moved everything onto one page for simplicity.
- **Expandable Inventory**: Inventory is hidden until needed. Search returns limited, relevant results.
- **Grouped Information**: Long lists were a pain point. I moved to **card-style layouts** that group related details. Users found this more readable and visually familiar — similar to Netflix or mobile app layouts.
- **Edit/Delete Functions**: Gives users flexibility and control to correct mistakes without feeling stuck.
- **Familiar Language**: Terms like "search," "edit," and "delete" match what users expect from modern interfaces.
- **Search by Name or Weight**: Reduces how much data users need to remember to locate an item.
- **Visual Hierarchy**: Used color, size, and spacing to separate buttons and input fields clearly. 
- **Hover Effects**: Inventory cards visually respond to hover actions for a more interactive experience.
- **Responsive Design**: The layout shrinks and expands properly for different screen sizes.
- **Error Feedback**: Error messages now inform users when they try actions like submitting empty forms — reducing confusion.

---

## Conclusion

The biggest focus for this UI design was making something easy and comfortable to use — something that required little or no instruction. The goal was that new employees could understand how to use the software quickly.

By changing the design based on user feedback and following common UX best practices, I feel confident that this project now offers a better user experience.

---

### 🌐 Hosted App

You can view the deployed web app on Firebase:

**[https://webapp-cfed6.web.app/](https://webapp-cfed6.web.app/)**
