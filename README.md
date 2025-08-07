# Marjorie Eliot's "Little Carnegie Hall"

This project was developed for the 2025 Lede Data Journalism Program.

After two projects focusing more on data analysis, I decided to dedicate some time to polish website interactivity and design. That meant a lot of JavaScript.

I chose **Marjorie Eliot's jazz concerts** as the theme because I was touched by her story. Although there have been several news stories and documentaries about her, I believe the timing of the 33rd anniversary of her tribute deserved a multimedia page.

Here is how each section was made:

- **Data Collection:**  
  The data I used was a list of jazz clubs addresses in Manhattan. I found two websites with this information, but their HTML was too out of date, which would require too much time to clean. I fixed this by copying the text and having an **LLM** turn it into lists, which I pasted in an **RStudio** script and turned into a dataframe.
  
  After that, I used the **tidygeocoder package** to get the latitude and longitude of each address, and the **sf package** to get a geometry column.

- **Mapping:**  
  I used a mix of **QGIS, Mapbox and Adobe Illustrator** to create the map with the points for each jazz club. The satellite image is from the [European Space Agency](https://www.esa.int/ESA_Multimedia/Images/2021/08/The_Big_Apple_New_York_City).

- **Animation:**  
  The animated text in the header was made using **Javascript**.

- **Interaction:**  
  I designed two buttons with **SVG**, one for turning the audio on and off, and the other for pausing or playing the video. And I used **JavaScript** to animated these buttons on click, to allow for user interactivity while keeping an exclusive design for the page.

- **Timeline:**  
  The timeline was designed using [d3kit-timeline](https://github.com/kristw/d3kit-timeline). The code is available on [Observable](https://observablehq.com/d/7029f1df9cc76fe6). I downloaded the SVG and used Adobe Illustrator to finish styling and save it as **ai2html**.

