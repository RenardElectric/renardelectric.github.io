function translate() {
    document.body.innerHTML = document.body.innerHTML
    .replace('head.home', 'Maison')
    .replace('head.creations', 'Creations')
    .replace('head.news', 'Nouvelles')
    .replace('head.language', 'Language')


    .replace('creations.new_creations', 'Nouvelles creations')
    .replace('creations.other_creations', 'Les autres creations')
    
    .replace('creation_1.header.left', 'minecraft version')
    .replace('creation_1.header.right', 'numbers of players')
    .replace('creation_1.name', 'creation name')
    .replace('creation_1.desc', 'creation short desc')

    .replace('creation_2.header.left', 'minecraft version')
    .replace('creation_2.header.right', 'numbers of players')
    .replace('creation_2.name', 'creation name')
    .replace('creation_2.desc', 'creation short desc')

    .replace('creation_3.header.left', 'minecraft version')
    .replace('creation_3.header.right', 'numbers of players')
    .replace('creation_3.name', 'creation name')
    .replace('creation_3.desc', 'creation short desc')
    
}