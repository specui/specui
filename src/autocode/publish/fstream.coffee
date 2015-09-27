Ignore = require 'fstream-ignore'
Packer = require 'fstream-npm'
path = require 'path'

module.exports = Packer

Packer.prototype.emitEntry = (entry) ->
	if this._paused
		this.once "resume", this.emitEntry.bind(this, entry)
		return

	# if there is a .gitignore, then we're going to
	# rename it to .npmignore in the output.
	if entry.basename == ".gitignore"
		entry.basename = ".npmignore"
		entry.path = path.resolve entry.dirname, entry.basename

	# all *.gyp files are renamed to binding.gyp for node-gyp
	# but only when they are in the same folder as a package.json file.
	if entry.basename.match(/\.gyp$/) && this.entries.indexOf("package.json") != -1
		entry.basename = "binding.gyp"
		entry.path = path.resolve entry.dirname, entry.basename

	# skip over symbolic links
	if entry.type == "SymbolicLink"
		entry.abort()
		return

	if entry.type != "Directory"
		# make it so that the folder in the tarball is named "package"
		h = path.dirname((entry.root || entry).path)
		t = entry.path.substr(h.length + 1).replace(/^[^\/\\]+/, this.root.props.folder)
		p = h + "/" + t

		entry.path = p
		entry.dirname = path.dirname p
		return Ignore.prototype.emitEntry.call this, entry

	# we don't want empty directories to show up in package
	# tarballs.
	# don't emit entry events for dirs, but still walk through
	# and read them.  This means that we need to proxy up their
	# entry events so that those entries won't be missed, since
	# .pipe() doesn't do anythign special with "child" events, on
	# with "entry" events.
	me = this
	entry.on "entry", (e) ->
		if e.parent == entry
			e.parent = me
			me.emit "entry", e
			
	entry.on "package", this.emit.bind(this, "package")