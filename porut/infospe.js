import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
const supabase = createClient('https://ndmvweijowxkfextdhfc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbXZ3ZWlqb3d4a2ZleHRkaGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxNjY3NDUsImV4cCI6MjAwMjc0Mjc0NX0.PpVwOCmEciVqmHpUphOAroKaQ3sNUWiBgqnzChHWvvc')


Array.from(document.getElementsByClassName('card')).forEach(pokemon => {
    pokemon.addEventListener('click', () => {
        console.log(pokemon.dataset.id)
        
        openInfo()})
})

async function openInfo() {
    var { info , err } = await supabase
            .from('list')
            .select(`
                pok_id,
                type (
                    *
                ),
                stats (
                    *
                ),
                weaknesses (
                    *
                ),
                evolution (
                    *
                )
            `)
            .eq('id_pok', pokemon.dataset.id);
            
            console.log(info);
}