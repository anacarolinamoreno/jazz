# Geolocating jazz clubs in New York City
# Source: https://bigapplejazz.com/nyc-jazz-clubs/

# Load packages
library(tidyverse)
library(tidygeocoder)
library(sf)

# Dataframe created by LLM
jazz_clubs_df <- data.frame(
  name = c("1803", "449 LA SCAT", "Arthur's Tavern", "Bar Next Door", "Bill's Place",
           "Birdland", "Blue Note", "Cellar Dog", "Chelsea Table and Stage", "Close Up",
           "Club Room", "The Craftsman", "Dizzy's Club", "The Django", "Drom",
           "The Ear Inn", "Hamilton's Bar and Kitchen", "Iridium", "Jazz Gallery",
           "Knickerbocker Bar and Grill", "Lucille's", "Mezzrow", "Midnight Blue",
           "Minton's Playhouse", "New Amsterdam Musical Association (NAMA)", "NUBLU",
           "Parlor Entertainment", "Patrick's Place", "Red Rooster Harlem", "Roulette",
           "Rum House", "Shrine", "Silvana", "Smalls", "Smoke", "The Stone",
           "Swing 46", "Terra Blues", "Tomi Jazz", "Village Vanguard", "Zinc Bar"),

  hours = c(NA, NA, "Resurrected: April 2022", "Not Yet Re-open (to La Lanterna Caffe)",
            "Friday and Saturday", "Open 7 Days a Week", "Open 7 Days a Week",
            "Open 7 Days a Week", NA, NA, "@ SoHo Grand Hotel", "Sunday Jam",
            "Open 7 Days a Week (Jazz at Lincoln Center)", "Open 7 Days a Week at The Roxy Hotel",
            "Jazz and other styles", "Sundays Trad Jazz", "Friday's Only", "Open 7 Days a Week",
            "Open 7 Days a Week", "Weekends in Season", "Thursdays/Saturdays",
            "Open 7 Days a Week", "Contact", "Wednesday-Sunday", "Monday/Wednesday",
            "Check Schedule for jazz", "Friday – Sunday", "Thursday – Sunday",
            "Ginny's Not Yet Reopened – Jazzy Sundays all day in Restaurant, and other nights",
            "Check Schedule", NA, "Check Schedule for Jazz", "Check Schedule for Jazz",
            "Open 7 Days a Week", "Wednesday-Sunday", "Located in The New School Glass Box Theatre",
            NA, "Open 7 Days a Week", "Open 7 Days a Week", "Open 7 Days a Week", "Check Calendar"),

  phone = c("(212) 267-3000", "(212) 234-3298", "(212) 675-6879", "(212) 529-5945",
            "(212) 281-0777", "(212) 581-3080", "(212) 475-8592", "(212) 675-6056",
            "(212) 434-0499", "(646) 410-2307", "(212) 965-3588", "(212) 933-0602",
            "(212) 258-9595", "(212) 519-6649", "(212) 777-1157", "(212) 226-9060",
            "(646) 559-2741", "(212) 582-2121", "(646) 494-3625", "(212) 228-8490",
            "(646) 370-4260", "(646) 476-4346", NA, "(646) 529-3397", "(212) 281-1350",
            "(212) 375-1500", "(212) 781-6595", "(212) 491-7800", "(212) 421-3821",
            "(212) 219-8242", NA, "(212) 690-7807", "(646) 692-4935", "(212) 675-7369",
            "(212) 864-6662", NA, "(212) 262-9554", "(212) 777-7776", "(646) 497-1254",
            "(212) 255-4037", "(212) 477-9462"),

  address = c("82 Reade Street", "449 Lenox Ave (Malcolm X)", "57 Grove Street",
              "129 MacDougal St.", "148 W133rd Street", "315 W. 44th St.",
              "131 W. Third St.", "75 Christopher Street", "152 West 26th Street",
              "154 Orchard St.", "310 West Broadway", "3155 Broadway",
              "10 Columbus Circle", "2 6th Ave.", "85 Avenue A", "326 Spring St",
              "3570 Broadway", "1650 Broadway", "1160 Broadway, 5th Floor",
              "33 University Place", "26 Macombs Place", "163 West 10th St.",
              "106 East 19th St.", "206 W 118th Street", "107 West 130th Street",
              "62 avenue C", "555 Edgecombe Ave", "2835 Frederick Douglass Blvd",
              "310 Lenox Ave", "228 W. Broadway", "228 West 47th Street",
              "2271 Adam Clayton Powell Jr. Blvd (7th Ae)", "300 W. 116th Street",
              "183 W. 10th St.", "2751 Broadway", "55 west 13th street",
              "349 W. 46th Street", "149 Bleecker Street", "239 E 53rd St.",
              "178 Seventh Ave.", "82 West 3rd Street"),

  details = c("(Corner of Church St.)", "(132nd / 133rd)", "(NW corner of Grove and 7th Ave. So.)",
              "(W3rd / W4th)", "(Lenox / AC Powell Jr. Blvd.)", "(8th / 9th Aves.)",
              "(6th Ave./ MacDougal St.)", "(at 7th Ave. South)", "(6th Ave. / 7th Ave.)",
              "(Stanton / Rivington)", "(Canal/Grand St.)", "(La Salle St. / Tiemann Pl.) (I.E. 123rd / 125th)",
              "(60th Street at Broadway, 5th floor)", "(Walker/ White)", "(6th / 7th)",
              "(Washington St / Greenwich St)", "(146th St / 147th St)", "(at 51st St)",
              "(W27th / W28th)", "(at 9th St.)", "(Corner of W150th Street)",
              "(7th Ave. So./ 6th Ave)", "(Park Ave. / Irving Pl.) $10 Cover 7PM / 8:45PM / 10:15PM",
              "(7th / St. Nicholas Ave.) (RIP)", "(Lenox / 7th)", "(4th / 5th Streets)",
              "(Corner of 160th St.)", "(8th Ave & 151st)", "(W125th / W126th St.)",
              "(Franklin St. / N. Moore St.)", "(Broadway / 8th Ave)", "(W133/ W134)",
              "(SW corner of Frederick Douglass Blvd/8th Ave)", "(West of 7th Ave. South)",
              "(105th / 106th)", "(6th Ave / 5th Ave)", "(8th / 9th Aves.)",
              "(Thompson St / LaGuardia Place)", "(2nd / 3rd)", "(At 11th St. and Max Gordon Corner)",
              "(Thompson / Sullivan)"),

  stringsAsFactors = FALSE
)

# Get only the columns we need and geocode the addresses (find latitude and longitude)
jazz_clubs_coord <- jazz_clubs_df |>
  mutate(city = "New York City",
         state = "NY",
         country = "USA") |>
  mutate(address = case_when(
    address == "131 W. Third St." ~ "131 W. 3rd Street",
    address == "178 Seventh Ave." ~ "178 7th Ave.",
    T ~ address
  )) |>
  geocode(street = address,
          city = city,
          state = state,
          country = country,
          method = 'osm',
          lat = lat_osm,
          long = long_osm)

# Turn the latitude and longitude into a geometry column
geolocated_jazz_clubs <- jazz_clubs_coord |>
  filter(!is.na(lat_osm)) |> # Remove the rows without geolocation
  st_as_sf(coords = c("long_osm", "lat_osm"), crs = 4326) |>
  select(name,
         address,
         city,
         geometry)

# Save dataframe as a geojson file
st_write(geolocated_jazz_clubs,
         dsn = "geolocated_jazz_clubs.geojson",
         driver = "GeoJSON",
         append=FALSE)
