#   Para carregar a base de dados inicial, copie a duplique a linha abaixo e substitua os valores desejados:
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

  #creates Father Categories
  Category.create([
  	{ name: 'Artes' },
  	{ name: 'Animais'},
  	{ name: 'Automóveis'}, 
  	{ name: 'Bebidas'}, 
  	{ name: 'Brinquedos'}, 
  	{ name: 'Casa e Decoração'}, 
  	{ name: 'Ciências'}, 
  	{ name: 'Culinária'}, 
  	{ name: 'Cultura'}, 
  	{ name: 'Esportes'}, 
  	{ name: 'Estudos'}, 
  	{ name: 'Filosofia'}, 
  	{ name: 'Finanças'}, 
  	{ name: 'Jóias'}, 
  	{ name: 'Jogos'}, 
  	{ name: 'Linguagem'}, 
  	{ name: 'Mídia'}, 
  	{ name: 'Moda'}, 
  	{ name: 'Ocultismo'}, 
  	{ name: 'Parques'},
  	{ name: 'Performance'}, 
  	{ name: 'Perfumes'}, 
  	{ name: 'Vestuário'}, 
  	{ name: 'Natureza'}, 
  	{ name: 'Política'}, 
  	{ name: 'Religiosidade'}, 
  	{ name: 'Tecnologia'}
  ])

  #creates Child Categories
  Category.create([
  	{ name: 'Artesanato', father_id: Category.where(name: 'Artes') }, 
  	{ name: 'Escultura', father_id: Category.where(name: 'Artes') }, 
  	{ name: 'Grafitti', father_id: Category.where(name: 'Artes') }, 
  	{ name: 'Pintura', father_id: Category.where(name: 'Artes') }, 
  	{ name: 'Tricot/Crochet', father_id: Category.where(name: 'Artes') }, 
  	
  	{ name: 'Gatos', father_id: Category.where(name: 'Animais') }, 
  	{ name: 'Cachorros', father_id: Category.where(name: 'Animais') }, 
  	
  	{ name: 'Carros', father_id: Category.where(name: 'Automóveis') }, 
  	{ name: 'Jetski', father_id: Category.where(name: 'Automóveis') }, 
  	{ name: 'Lanchas', father_id: Category.where(name: 'Automóveis') }, 
  	{ name: 'Motos', father_id: Category.where(name: 'Automóveis') }, 

  	{ name: 'Café', father_id: Category.where(name: 'Bebidas') }, 
  	{ name: 'Cerveja', father_id: Category.where(name: 'Bebidas') }, 
  	{ name: 'Espumante', father_id: Category.where(name: 'Bebidas') }, 
  	{ name: 'Vinho', father_id: Category.where(name: 'Bebidas') }, 
  	{ name: 'Whisky', father_id: Category.where(name: 'Bebidas') }, 

  	{ name: 'Bonecos', father_id: Category.where(name: 'Brinquedos') }, 
  	{ name: 'Lego', father_id: Category.where(name: 'Brinquedos') }, 

  	{ name: 'Banho', father_id: Category.where(name: 'Casa e Decoração') }, 
  	{ name: 'Cozinha', father_id: Category.where(name: 'Casa e Decoração') }, 
  	{ name: 'Eletrodomésticos', father_id: Category.where(name: 'Casa e Decoração') }, 
  	{ name: 'Jardinagem', father_id: Category.where(name: 'Casa e Decoração') }, 
  	{ name: 'Quarto', father_id: Category.where(name: 'Casa e Decoração') }, 
  	{ name: 'Sala', father_id: Category.where(name: 'Casa e Decoração') }, 

  	{ name: 'Astronomia', father_id: Category.where(name: 'Ciências') }, 
  	{ name: 'Biologia', father_id: Category.where(name: 'Ciências') }, 
  	{ name: 'Física', father_id: Category.where(name: 'Ciências') }, 
  	{ name: 'Matemática', father_id: Category.where(name: 'Ciências') }, 
  	{ name: 'Médicas', father_id: Category.where(name: 'Ciências') }, 
  	{ name: 'Odontologia', father_id: Category.where(name: 'Ciências') },
  	{ name: 'Química', father_id: Category.where(name: 'Ciências') },
  	
  	{ name: 'Chocolate', father_id: Category.where(name: 'Culinária') },
  	{ name: 'Natural', father_id: Category.where(name: 'Culinária') },

  	{ name: 'Egípcia', father_id: Category.where(name: 'Cultura') },
  	{ name: 'Greco-Romana', father_id: Category.where(name: 'Cultura') },
  	{ name: 'Nórdica', father_id: Category.where(name: 'Cultura') },
  	{ name: 'Chinesa', father_id: Category.where(name: 'Cultura') },

  	{ name: 'Academia', father_id: Category.where(name: 'Esportes') },
  	{ name: 'Aquáticos', father_id: Category.where(name: 'Esportes') },
  	{ name: 'Artes Marciais', father_id: Category.where(name: 'Esportes') },
  	{ name: 'Velocidade', father_id: Category.where(name: 'Esportes') },
  	{ name: 'Quadra', father_id: Category.where(name: 'Esportes') },
  	{ name: 'Radicais', father_id: Category.where(name: 'Esportes') },

  	{ name: 'Bolsa de Valores', father_id: Category.where(name: 'Finanças') },

  	{ name: 'Cartas', father_id: Category.where(name: 'Jogos') },
  	{ name: 'Tabuleiro', father_id: Category.where(name: 'Jogos') },
  	{ name: 'Videogames', father_id: Category.where(name: 'Jogos') },

  	{ name: 'Línguas Estrangeiras', father_id: Category.where(name: 'Linguagem') },
  	{ name: 'Livros', father_id: Category.where(name: 'Linguagem') },
  	{ name: 'Livros Digitais', father_id: Category.where(name: 'Linguagem') },
  	{ name: 'Poesia', father_id: Category.where(name: 'Linguagem') },

  	{ name: 'Filmes', father_id: Category.where(name: 'Mídia') },
  	{ name: 'Música', father_id: Category.where(name: 'Mídia') },
  	{ name: 'Seriado', father_id: Category.where(name: 'Mídia') },
  	{ name: 'Teatro', father_id: Category.where(name: 'Mídia') },

  	{ name: 'Cosméticos', father_id: Category.where(name: 'Moda') }
  	
  	])