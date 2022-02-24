<% for (const resep of allRecipes) { %>
        <% if(resep.judulResep === param.split("-").join(" ")) { %>
          <% const {judulResep, deskripsi, ...allBahan} = resep; %>
          <h1><%= judulResep %></h1>
          <div class="row content">
            <div class="col">
              <p><%= deskripsi %></p>
              <hr>
              <h3>Bahan - bahan</h3>
             <ul>
              <% for (const bahan in allBahan) { %>
                <li><%= allBahan[bahan] %></li>
              <% } %>
             </ul>
            </div>
          </div>
        <% } %>
      <% } %>