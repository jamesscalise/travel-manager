# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



tokyo = Destination.create(name: "Tokyo")
iceland = Destination.create(name: "Iceland")

tokyo_tower = Site.create(name: "Tokyo Tower", destination: tokyo)
senso_ji = Site.create(name: "Senso-Ji", destination: tokyo)

blue_lagoon = Site.create(name: "Blue Lagoon", destination: iceland)
gullfoss_falls = Site.create(name: "Gullfoss Falls", destination: iceland)