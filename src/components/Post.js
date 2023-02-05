import { Box } from "@mui/system"

const Post = ({ index, caption, username, imgURLS }) => {
  return (
    <article key={index}>
      <h3>{caption && caption}</h3>
      <p>{username}</p>
      {imgURLS?.map((img, index) => {
        return (
          <Box
            component="img"
            sx={{
              height: 1000,
              width: 1000,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              mr: "2rem",
              my: 2,
            }}
            key={index}
            src={img}
          />
        )
      })}
    </article>
  )
}

export default Post
