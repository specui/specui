# load deps
cson = require 'season'
fs = require 'fs'
marked = require 'marked'
yaml = require 'js-yaml'
xml = require 'xml-to-jsobj'

module.exports = (path) ->
		
	# get path
	path = path or this.path
	
	# require path
	if !path
		throw new Error 'path for crystal config is required'
	
	# get config
	for ext in ['yml','yaml','cson','json','xml']
		file = "#{path}/crystal.#{ext}"
		
		if fs.existsSync file
			config = fs.readFileSync file
			
			config = switch ext
				when 'yml','yaml' then yaml.safeLoad config
				when 'cson' then cson.readFileSync file
				when 'json' then JSON.parse config
				when 'xml' then xml.parseFromString config
			
			break
			
	# return false if config fails
	if !config
		return false
	
	if config.doc
		doc = {
			chapters: []
		}
		
		for chapter_name of config.doc
			chapter = config.doc[chapter_name]
			chapter_data = {
				name: chapter_name
				pages: []
			}
			chapter_data.chapter = chapter_data
			if chapter.title
				chapter_data.title = chapter.title
			chapter_data.doc = doc
			
			for page_name of chapter.pages
				page = chapter.pages[page_name]
				page_data = {
					name: page_name
				}
				page_data.chapter = chapter_data
				page_file = "#{path}/src/doc/#{chapter_name}/#{page_name}.md"
				if fs.existsSync page_file
					page_data.content = {}
					page_data.content.md = fs.readFileSync page_file, 'utf8'
					page_data.content.html = marked page_data.content.md
				page_data.doc = doc
				if page.title
					page_data.title = page.title
				page_data.page = page_data
				chapter_data.pages.push page_data
			doc.chapters.push chapter_data
		config.doc = doc
	
	config.ext = ext
	config.file = file
	config