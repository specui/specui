import { CodeSnippet } from '../CodeSnippet';

const spec = `
models:
  post:
    attributes:
      title:
        type: string
      content:
        type: string
`;

const generatedCode = `
package models

import "time"

type Post struct {
    ID        int       \`json:"id"\`
    Title     string    \`json:"title"\`
    Content   string    \`json:"content"\`
    CreatedAt time.Time \`json:"created_at"\`
    UpdatedAt time.Time \`json:"updated_at"\`
}
`;

const handwrittenCode = `
package handlers

import (
    "net/http"
    "time"

    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
    "my-app/models"
)

func CreatePost(db *gorm.DB) gin.HandlerFunc {
  return func(c *gin.Context) {
      var newPost models.Post
      if err := c.ShouldBindJSON(&newPost); err != nil {
          c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
          return
      }

      // write some other code

      db.Create(&newPost)
      c.JSON(http.StatusCreated, newPost)
  }
}
`;

export const ManualFeature = () => {
  return (
    <div className="pb-32 px-4 mx-auto max-w-6xl">
      <h2 className="mb-2 text-4xl">Use alongside your handwritten code</h2>
      <p className="mb-8 text-gray-500 text-xl w-2/3">
        Effortlessly blend automated and manual code. Designed for synergy, ZappJS allows you to
        generate essential code structures automatically while providing the flexibility to write
        your custom code alongside.
      </p>
      <h3 className="mb-4 text-lg">
        Choose whether to generate your models, handlers, both, or neither
      </h3>
      <div className="gap-4 grid grid-cols-3">
        <CodeSnippet className="col-span-3 md:col-span-1" title="spec.yml">
          {spec}
        </CodeSnippet>
        <CodeSnippet className="col-span-3 md:col-span-1" title="post.go (generated)">
          {generatedCode}
        </CodeSnippet>
        <CodeSnippet className="col-span-3 md:col-span-1" title="post_handlers.go (handwritten)">
          {handwrittenCode}
        </CodeSnippet>
      </div>
    </div>
  );
};
